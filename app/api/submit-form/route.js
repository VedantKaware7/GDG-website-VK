import { connect } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return new Response(
        JSON.stringify({ message: "Authentication required" }),
        { status: 401 }
      );
    }

    const user = session.user;
    const userEmail = user.email;

    const deadline = new Date("2026-08-23T23:59:59+05:30");
    if (new Date() > deadline)
      return new Response(
        JSON.stringify({
          message: "The submission deadline has passed"
        }),
        { status: 403 }
      );
                  

    const db = await connect();
    const data = await req.json();

    const { Department, Questions, ...formFields } = data;

    const regNoRegex = /^\d{2}[A-Z]{3}\d{4}$/;
    if (formFields.RegistrationNumber && !regNoRegex.test(formFields.RegistrationNumber)) {
      return new Response(
        JSON.stringify({
          message: "Registration number must be 2 numbers, 3 uppercase letters, and 4 numbers (e.g. 25BCE5612)",
        }),
        { status: 400 }
      );
    }

    const collection = db.collection("formData");

    const existingSubmissions = await collection.where("Email", "==", userEmail).get();

    const alreadySubmittedDept = existingSubmissions.docs.some(
      (doc) => doc.data()?.Department === Department
    );

    if (alreadySubmittedDept) {
      return new Response(
        JSON.stringify({
          message: `You have already submitted an application for ${Department}`,
        }),
        { status: 400 }
      );
    }

    if (existingSubmissions.size >= 2) {
      return new Response(
        JSON.stringify({
          message: "Remember that you can only submit upto 2 unique applications",
        }),
        { status: 400 }
      );
    }

    // Only these fields may come from the request body. Spreading the whole
    // body here would let an applicant set any field they like on their own
    // application record -- including `shortlisted`.
    const APPLICANT_FIELDS = [
      "Name",
      "RegistrationNumber",
      "Phone",
      "Gender",
      "Year of Study",
    ];

    const applicantDetails = {};
    for (const field of APPLICANT_FIELDS) {
      const value = formFields[field];
      if (typeof value === "string" && value.trim() !== "") {
        applicantDetails[field] = value.trim();
      }
    }

    // Questions must be a plain object of answers, not an array or anything else.
    const answers =
      Questions && typeof Questions === "object" && !Array.isArray(Questions)
        ? Questions
        : {};

    await collection.add({
      ...applicantDetails,
      Department,
      Questions: answers,
      Email: userEmail,
      // Decided by admins only, never by the applicant.
      shortlisted: false,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        message: "Form submitted successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return new Response(JSON.stringify({ message: "Error submitting form" }), {
      status: 500,
    });
  }
}

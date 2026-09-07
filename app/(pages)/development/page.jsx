import React from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DeptHero from "@/components/DeptHero";
import { ArrowRight } from "lucide-react";

const features = [
    {
        name: "∑_ApZ3V_gh",
        description:
            "k*N$5c fu900Q 7k3 C20Z!g 1kL1d3er & nUKpZg %AU0₹g!ir3C.",
        href: "/7349e360-afdf-476d-9af8-20d680067f0b",
        cta: "J01n_§x",
    },
    {
        name: "µ_Wb₹5D_lp",
        description:
            "bp05Lb(bTI, CZWSr₹#^Z *7J ^T( f391xQ 1kp #q₹X 3z!Kux 6j(IkL.",
        href: "/2bd84c7a-ee2a-48b7-9568-6a4b094d3618",
        cta: "J01n_§x",
    },
];

const page = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <DeptHero dept={{ name: "Development Departments" }} />

            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {features.map((feature) => (
                            <li
                                key={feature.name}
                                className="flex flex-col rounded-xl border border-border bg-card p-6"
                            >
                                <h2 className="font-semibold text-foreground">{feature.name}</h2>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                                    {feature.description}
                                </p>
                                <Link
                                    href={feature.href}
                                    className="group mt-6 inline-flex w-fit items-center text-sm font-medium text-primary hover:underline"
                                >
                                    {feature.cta}
                                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default page;

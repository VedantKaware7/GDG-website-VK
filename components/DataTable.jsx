"use client";
import { React, useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterDepartment from "./FilterDepartment";
import FilterShortlisted from "./FilterShortlisted";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { Button } from "./ui/button";
import { CheckBoxComp } from "./CheckBoxComp";
import { toast } from "sonner";
import { curDate, curDay, curMonth, curYear, months, days } from "@/constants";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { Input } from "@/components/ui/input";
import PaginationComp from "./PaginationComp";
import DialogComp from "./DialogComp";
import MailComposer from "./MailComposer";
import { CSVLink } from "react-csv";
import { CSV_Header } from "@/constants";

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const [deptFiltered, setDeptFiltered] = useState(data);
  const [shortFiltered, setShortFiltered] = useState(data);

  const commonElements = (arr1, arr2) => {
    let common = [];
    arr1.map((elt1) => {
      arr2.map((elt2) => {
        if (elt1 === elt2) {
          common.push(elt1);
        }
      });
    });
    return common;
  };

  const filterFunc = (dept) => {
    setDeptFiltered(data);
    const filteredData = data.filter((data) => {
      return data.Department === dept;
    });

    setDeptFiltered(filteredData);
  };

  const shortlistedFilterFunc = (status) => {
    const filteredData = data.filter((data) => {
      return String(data.shortlisted) === status;
    });

    setShortFiltered(filteredData);
  };

  // Pipeline Step 1: Filter reconciliation
  useEffect(() => {
    if (deptFiltered !== data && shortFiltered !== data) {
      setTableData(commonElements(deptFiltered, shortFiltered));
    } else if (deptFiltered !== data && shortFiltered === data) {
      setTableData(deptFiltered);
    } else if (deptFiltered === data && shortFiltered !== data) {
      setTableData(shortFiltered);
    } else {
      setTableData(data);
    }
  }, [deptFiltered, shortFiltered]);

  const handleShortlist = async (id, isShortlisted) => {
    console.log(
      `Shortlist button pressed for ID: ${id}, current status: ${isShortlisted}`
    );

    try {
      const res = await fetch(`/api/shortlist/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortlisted: !isShortlisted }), // Send the new status
      });

      if (res.ok) {
        const updatedData = tableData.map((applicant) => {
          if (applicant._id === id) {
            console.log(
              `Updating applicant with ID: ${id} to shortlisted status: ${!isShortlisted}`
            );
            return { ...applicant, shortlisted: !isShortlisted }; // Update in local state
          }
          return applicant;
        });
        setTableData(updatedData);
        toast.success("Student status updated!");
      } else {
        console.error("Failed to update applicant status.");
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error occurred while updating the status:", error.message);
      toast.error("Failed to update status");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "RegistrationNumber",
        accessor: "RegistrationNumber",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Phone",
        accessor: "Phone",
      },
      {
        Header: "Department",
        accessor: "Department",
      },
      {
        Header: "Preference",
        accessor: "Pref",
      },
      {
        Header: "Shortlisted",
        accessor: "shortlisted",
        Cell: ({ row }) => (
          <button
            onClick={() =>
              handleShortlist(row.original._id, row.original.shortlisted)
            }
            className={`px-4 py-2 rounded w-[115px] ${
              row.original.shortlisted
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {row.original.shortlisted ? "Unshortlist" : "Shortlist"}
          </button>
        ),
      },
    ],
    [tableData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <CheckBoxComp {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <CheckBoxComp {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const { globalFilter, pageIndex } = state;

  const handlePageSize = (e) => {
    const sz = Number(e.target.value);
    if (sz) {
      setPageSize(sz);
    } else {
      setPageSize(10);
    }
  };

  const handleRowSelection = async (payloadData) => {
    const selectedApplicants = selectedFlatRows.map((row) => row.original);
    const request = {
      recipients: selectedApplicants,
      payloadData: payloadData,
    };

    try {
      // const response = await MailSender(request);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        toast("Invite has been sent!", {
          description: `On ${months[curMonth - 1]} ${curDate}, ${curYear}`,
        });
      } else {
        toast("Failed to send invite", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast("Failed to send invite", {
        description: "Please try again later.",
      });
    }
  };

  const showRowData = () => {
    const selectedApplicants = selectedFlatRows.map((row) => row.original);
    return selectedApplicants;
  };

  const formatQuestionsForCsv = (item) => {
    if (!item?.Questions) return "";

    if (Array.isArray(item.Questions)) {
      return item.Questions
        .map((entry) => {
          if (typeof entry === "string") return entry;
          if (Array.isArray(entry)) return entry.join(": ");
          if (entry && typeof entry === "object") {
            return Object.entries(entry)
              .map(([key, value]) => `${key}: ${value}`)
              .join(" | ");
          }
          return String(entry ?? "");
        })
        .join(" | ");
    }

    if (typeof item.Questions === "object") {
      return Object.entries(item.Questions)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join(" | ");
    }

    return String(item.Questions);
  };

  const csv_link = {
    headers: CSV_Header,
    data: tableData.map((item) => ({
      ...item,
      Questions: formatQuestionsForCsv(item),
    })),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        <Input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search applicants..."
          aria-label="Search applicants"
          className="min-w-[240px] flex-1"
        />
        <Input
          type="number"
          min={1}
          onChange={(e) => handlePageSize(e)}
          placeholder="Rows"
          aria-label="Rows per page"
          className="w-24"
        />
        <FilterDepartment filterFunc={filterFunc} />
        <FilterShortlisted filterFunc={shortlistedFilterFunc} />
        <DialogComp selectedApplicants={showRowData} />

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <GrPowerReset />
          Reset
        </Button>

        <CSVLink
          {...csv_link}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <IoCloudDownloadOutline />
          Download CSV
        </CSVLink>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((hg) => {
              const { key: hgKey, ...hgProps } = hg.getHeaderGroupProps();
              return (
                <TableRow key={hgKey} {...hgProps}>
                  {hg.headers.map((header) => {
                    const { key: hKey, ...hProps } = header.getHeaderProps(
                      header.getSortByToggleProps()
                    );
                    return (
                      <TableHead key={hKey} {...hProps} className="whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {header.render("Header")}
                          <FaSortAmountDownAlt className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody {...getTableBodyProps()}>
            {page.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={headerGroups[0]?.headers.length || 1}
                  className="py-12 text-center text-muted-foreground"
                >
                  No applications match these filters.
                </TableCell>
              </TableRow>
            ) : (
              page.map((row) => {
                prepareRow(row);
                const { key: rowKey, ...rowProps } = row.getRowProps();
                return (
                  <TableRow key={rowKey} {...rowProps}>
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } = cell.getCellProps();
                      return (
                        <TableCell key={cellKey} {...cellProps}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationComp
        pageIndex={pageIndex}
        pages={pageOptions.length}
        nextPage={nextPage}
        canNext={canNextPage}
        previousPage={previousPage}
        canPrev={canPreviousPage}
        goto={gotoPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default DataTable;

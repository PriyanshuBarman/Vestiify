import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDownIcon, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { MediaQuery } from "react-responsive";
import { Link } from "react-router";
import { columnKeys, columnLabels, getNewOrder, getNextColumn, sortPeersBy } from "../utils/similarFundsTable";

function SimilarFundsTable({ fund }) {
  const [activeColumn, setActiveColumn] = useState("return_1y");
  const [sortOrder, setSortOrder] = useState("desc");
  const [peers, setPeers] = useState(fund?.comparison);

  useEffect(() => setPeers(fund?.comparison || []), [fund?.comparison]);

  function handleMobileClick() {
    const next = getNextColumn(activeColumn);
    setActiveColumn(next);
    let order = next === "expense_ratio" ? "asc" : "desc";
    setPeers((prevPeers) => sortPeersBy(prevPeers, next, order));
  }

  function handleDesktopClick(clicked) {
    const newOrder = getNewOrder(clicked, activeColumn, sortOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
    setSortOrder(newOrder);
  }

  return (
    <>
      {/* ============= Mobile View ============= */}

      <MediaQuery maxWidth={640}>
        <div className="pl-4">
          <Table>
            <TableHeader>
              <TableRow className="border-transparent">
                <TableHead className="text-muted-foreground p-0">Fund name</TableHead>
                <TableHead onClick={handleMobileClick} className="text-primary">
                  <div className="flex items-center justify-end gap-1">
                    <span>{columnLabels[activeColumn].fullName}</span>
                    <ChevronsUpDown className="fill-primary size-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="sm:font-medium">
              {peers?.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className={`${item.name === fund?.name && "font-semibold"} py-4 pl-0 whitespace-pre-wrap`}>
                    {item.short_name}
                  </TableCell>
                  <TableCell className="py-4 pr-4 text-right font-semibold">
                    {item[activeColumn] ? `${item[activeColumn]} ${activeColumn !== "aum" ? "%" : "Cr"}` : "NA"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MediaQuery>

      {/* ============== DeskTop View ============== */}

      <MediaQuery minWidth={641}>
        <div className="overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent">
                <TableHead className="py-4 pl-6 text-base">Fund name</TableHead>
                {columnKeys.map((key) => (
                  <TableHead key={key}>
                    <div
                      onClick={() => handleDesktopClick(key)}
                      className={`flex h-full cursor-pointer items-center gap-2 py-4 ${
                        activeColumn === key && "text-primary fill-primary"
                      }`}
                    >
                      {columnLabels[key].shortName}
                      {activeColumn === key ? (
                        <ChevronDownIcon
                          className={`size-4 fill-inherit transition-all duration-200 ease-in ${sortOrder === "desc" && "rotate-180"}`}
                        />
                      ) : (
                        <ChevronDownIcon className="fill-foreground size-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="sm:font-medium">
              {peers?.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className={`${item.name === fund?.name && "sm:text-primary"} py-4 pl-4`}>
                    <Link to={`/mutual-funds/${item.unique_fund_code} `} className="hover:text-primary">
                      {item.short_name}
                    </Link>
                  </TableCell>
                  {columnKeys.map((key) => (
                    <TableCell key={key} className={`py-4 ${activeColumn === key && "text-primary"}`}>
                      {item[key] ? `${item[key]} ${key === "aum" ? "Cr" : "%"}` : "NA"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MediaQuery>
    </>
  );
}

export default SimilarFundsTable;

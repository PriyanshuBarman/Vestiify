import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronDownIcon, ChevronsLeftRight, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import FundLogo from "../components/FundLogo";
import { useGetCategoryFundList } from "../hooks/queries/externalQueries";
import { columnKeys, columnLabels, getNewOrder, getNextColumn, sortPeersBy, unit } from "../utils/collectionsHelper";
import { collectionConfig } from "../constants/collection";
import FundRating from "@/components/FundRating";

function CollectionPage() {
  const [peers, setPeers] = useState();
  const [activeColumn, setActiveColumn] = useState("return_1y"); // active column (key)
  const [sortOrder, setSortOrder] = useState("desc");
  const isMobile = useIsMobile();
  const { name } = useParams();

  const { data } = useGetCategoryFundList(name, collectionConfig[name]?.url);

  useEffect(() => setPeers(data || []), [data]);

  return (
    <div className="relative space-y-10">
      <header className="bg-background flex items-center gap-8 px-4">
        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-lg font-semibold sm:text-2xl">{name} </h2>
          <p className="text-muted-foreground text-sm">{collectionConfig[name].description || ""}</p>
        </div>
        <Avatar className="size-18 rounded-lg border p-2 sm:h-24 sm:w-34 dark:mix-blend-hard-light">
          <AvatarImage src={`/${name}.svg`} />
        </Avatar>
      </header>

      {isMobile ? (
        // ----------- MOBILE TABLE -----------
        <MobileTable {...{ peers, setPeers, activeColumn, setActiveColumn }} />
      ) : (
        // ----------- LARGE SCREEN TABLE -----------
        <DesktopTable {...{ peers, setPeers, activeColumn, setActiveColumn, sortOrder, setSortOrder }} />
      )}
    </div>
  );
}

export default CollectionPage;

function MobileTable({ peers, setPeers, activeColumn, setActiveColumn }) {
  const handleMobileClick = () => {
    const next = getNextColumn(activeColumn);
    setActiveColumn(next);
    let order = next === "ter" ? "asc" : "desc";
    setPeers((prevPeers) => sortPeersBy(prevPeers, next, order));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead className="pl-4">Mutual funds</TableHead>
          <TableHead onClick={handleMobileClick} className="flex items-center justify-end gap-1 pr-3 text-right">
            <ChevronsLeftRight className="size-4" />
            {columnLabels[activeColumn].fullName}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {peers?.map((item) => (
          <TableRow key={item.code}>
            <TableCell className="flex items-center gap-4 py-4 pl-4">
              <FundLogo logoCode={item.short_code} className="size-8.5" />
              <div>
                <Link to={`/mutual-funds/${item.code}`}>
                  <h4 className="text-foreground overflow-hidden font-[430] text-wrap">{item.short_name}</h4>
                </Link>
                <div className="text-muted-foreground mt-1.5 flex flex-wrap text-xs">
                  <p>
                    {item.category} {item.fund_category}
                  </p>
                  <FundRating rating={item.fund_rating} />
                </div>
              </div>
            </TableCell>

            <TableCell className="pr-4 text-right font-[450]">
              {item[activeColumn] ? `${item[activeColumn]} ${activeColumn === "aum" ? "Cr" : "%"}` : "NA"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DesktopTable({ peers, setPeers, activeColumn, setActiveColumn, sortOrder, setSortOrder }) {
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, sortOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
    setSortOrder(newOrder);
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead className="text-muted-foreground px-8 py-6 sm:font-medium">Fund name</TableHead>
            {columnKeys.map((key) => (
              <TableHead key={key}>
                <div
                  onClick={() => handleDesktopClick(key)}
                  className={`flex h-full cursor-pointer items-center gap-2 py-4 sm:font-medium ${
                    activeColumn === key && "text-primary fill-primary"
                  }`}
                >
                  {columnLabels[key].fullName}
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

        <TableBody>
          {peers?.map((f) => (
            <TableRow key={f.code}>
              <TableCell className="flex items-center gap-8 py-4 pl-8">
                <FundLogo logoCode={f.short_code} />
                <div>
                  <Link to={`/mutual-funds/${f.code}`}>
                    <h4 className="text-base text-wrap">{f.name}</h4>
                  </Link>
                  <p className="text-muted-foreground mt-2 flex text-xs">
                    {f.category} {f.fund_category}
                    <FundRating rating={f.fund_rating} />
                  </p>
                </div>
              </TableCell>

              {columnKeys.map((key) => (
                <TableCell
                  key={key}
                  className={` ${activeColumn === key && "text-primary font-semibold"} text-center text-[0.92rem] font-medium`}
                >
                  {f[key] ? `${f[key]?.toFixed(1)} ${unit[key]}` : "NA"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

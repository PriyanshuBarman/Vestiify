import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useGetPortfolio } from "../../hooks/queries/internalQueries";
import DesktopTable from "./DesktopTable";
import FilterBtn from "./FilterBtn";
import MobileTable from "./MobileTable";
import SectionCards from "./SectionCards";

function InvestmentsTab() {
  const [sortBy, setSortBy] = useState("current");
  const [order, setOrder] = useState("desc");

  const { data } = useGetPortfolio();
  const [portfolio, setPortfolio] = useState();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!data) return;
    const sortedData = data.toSorted((fundA, fundB) => {
      return order === "asc" ? fundA[sortBy] - fundB[sortBy] : fundB[sortBy] - fundA[sortBy];
    });
    setPortfolio(sortedData);
  }, [data, sortBy, order]);

  return (
    <div className="Dashboard-Investments">
      <SectionCards />
      <FilterBtn {...{ sortBy, setSortBy, order, setOrder }} />

      {isMobile ? (
        <MobileTable {...{ portfolio, sortBy, setSortBy, order, setOrder }} />
      ) : (
        <DesktopTable {...{ portfolio, sortBy, setSortBy, order, setOrder }} />
      )}
    </div>
  );
}

export default InvestmentsTab;

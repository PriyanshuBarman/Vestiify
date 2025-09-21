import { cn } from "@/lib/utils";
import { Link } from "react-router";

function SectionHeading({ heading, subHeading, navigateTo, className }) {
  return (
    <div
      className={cn(
        "Section-Heading mb-2 flex items-center justify-between px-4 sm:mb-4 sm:px-0",
        className,
      )}
    >
      <h2 className="font-medium sm:text-xl sm:font-semibold">{heading}</h2>
      <Link to={navigateTo}>
        <h3 className="text-primary text-[0.8rem] font-medium sm:text-base">
          {subHeading}
        </h3>
      </Link>
    </div>
  );
}

export default SectionHeading;

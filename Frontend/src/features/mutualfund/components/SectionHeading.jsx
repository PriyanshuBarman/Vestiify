function SectionHeading({ heading, subHeading }) {
  return (
    <div className="Section-Heading flex items-center justify-between sm:mb-4 mb-2 px-4 sm:px-0">
      <h2 className="font-medium sm:text-xl sm:font-semibold">{heading}</h2>
      <h3 className="text-primary text-[0.8rem] font-medium sm:text-base">{subHeading}</h3>
    </div>
  );
}

export default SectionHeading;

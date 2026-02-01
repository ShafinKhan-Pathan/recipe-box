import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface StyledButtonprops {
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  tag: string;
  linkTo: string;
  color?: string;
  redirectIcon: LucideIcon;
}
const StyledButton = ({
  icon: Icon,
  name,
  shortDescription,
  tag,
  linkTo,
  color,
  redirectIcon: Icons,
}: StyledButtonprops) => {
  return (
    <>
      <Link
        to={linkTo}
        className={`relative h-[35vh] sm:h-[30vh] w-[90%] md:w-[50%] mx-auto gap-2 border  ${color ? "bg-[rgba(31,42,95,0.4)] hover:bg-[rgba(31,42,95,0.6)] border-[#7A87C7]" : "bg-[rgba(63,31,95,0.4)] hover:bg-[rgba(63,31,95,0.6)] border-[#A681CA]"}  text-white rounded-lg p-4 flex flex-col items-start hover:shadow-lg cursor-pointer  hover:scale-[1.02] transition-transform`}
      >
        <Icon className="h-8 w-8" />
        <span className="mt-2 text-xl md:text-2xl font-bold leading-relaxed">
          {name}
        </span>
        <span className="mt-1 text-sm text-start">{shortDescription}</span>
        <div className="absolute bottom-2 flex justify-center items-center gap-2">
          <span className="text-sm rounded-full">{tag}</span>
          <Icons className="h-6 w-6" />
        </div>
      </Link>
    </>
  );
};

export default StyledButton;

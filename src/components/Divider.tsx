import React from "react";
import clsx from "clsx";

interface DividerProps extends React.ComponentProps<"hr"> {
  text: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className, ...rest }) => {
  return (
    <div className="relative">
      <hr
        className={clsx("border-t-2 border-gray-300", className)}
        {...rest}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 px-2 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default Divider;

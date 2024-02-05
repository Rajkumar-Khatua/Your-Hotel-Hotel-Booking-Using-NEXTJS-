"use client";

import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
  center: boolean;
}
const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <h2 className="text-lg font-medium text-neutral-500">{subtitle}</h2>
    </div>
  );
};

export default Heading;

"use client";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      className="
                h-[70vh]
                flex
                flex-col
                justify-center
                items-center
            "
    >
      <PuffLoader size={150} color={"#030303"} />
    </div>
  );
};

export default Loader;

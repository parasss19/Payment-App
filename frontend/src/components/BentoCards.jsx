import React from "react";

const BentoCards = ({ title, description }) => {
  return (
    <div>
      <div className="flex flex-1 h-full rounded-2xl p-[0.5px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
        <div className="p-6 flex flex-col gap-4 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50">
          <p className="text-2xl font-[poppins] font-semibold">{title}</p>
          <p className="font-light text-lg">{description} </p>
        </div>
      </div>
    </div>
  );
};

export default BentoCards;

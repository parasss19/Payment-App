import Balance from "@/components/Balance";
import Filter from "@/components/Filter";
import P2PTransferCard from "@/components/P2PTransferCard";
import React from "react";

const P2PTransfer = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto lg:px-8 pt-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="inline-block curved-underline font-[Geist] text-2xl lg:text-3xl font-semibold">
          Make Payments
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto md:max-w-full md:mx-0 grid grid-cols-1 gap-4 my-10 md:grid-cols-3">
        <div className='md:col-span-1 flex flex-col gap-6'>
          <P2PTransferCard />
          <Balance/>
        </div>

        <div className="md:col-span-2">
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default P2PTransfer;

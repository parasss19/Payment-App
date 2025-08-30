import P2PTransactions from "@/components/P2PTransactions";
import WalletTransactions from "@/components/WalletTransactions";
import React from "react";

const Transactions = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto lg:px-8 pt-10">
      {/* Heading */}
      <div className="text-center mb-8 ">
        <h1 className="inline-block curved-underline font-[Geist] text-2xl lg:text-3xl font-semibold">
          Transactions History
        </h1>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto md:max-w-full md:mx-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <P2PTransactions showAllInCard={true} />
        </div>

        <div className="md:col-span-1">
          <WalletTransactions showAllInCard={true} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;

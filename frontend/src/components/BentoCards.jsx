import React from "react";

const BentoCards = () => {
  return (
    <div className="container">
      <h1 className="font-[poppins] text-4xl leading-normal mb-4 sm:font-semibold sm:max-w-2xl"> Features </h1>
     
      <div className="flex flex-col lg:flex-row gap-4  mt-6">
        {/* card 1 */}
        <div className="flex flex-1 rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
          <div className="p-6 flex flex-col gap-4 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50">
            <p className="text-2xl font-[poppins] font-semibold">Secure & Seamless Transactions </p>
            <p className="font-light text-lg">
              Experience hassle-free money transfers with our secure and efficient transaction system powered by MongoDB transactions, ensuring your funds are safely processed every time.
            </p>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex flex-1 rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
          <div className="p-6 flex flex-col gap-4 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50">
            <p className="text-2xl font-[poppins] font-semibold">Authenticated & Protected Access </p>
            <p className="font-light text-lg">
              Your security is our priority! With robust authentication and protected routes, only verified users can access their accounts, making transactions safer than ever.            </p>
          </div>
        </div>

        {/* card 3 */}
        <div className="flex flex-1 rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
          <div className="p-6 flex flex-col gap-4 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50">
            <p className="text-2xl font-[poppins] font-semibold">Effortless Money Management</p>
            <p className="font-light text-lg">
              Easily track your transactions, monitor your balance, and manage your payments—all in one intuitive and user-friendly dashboard.            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BentoCards;

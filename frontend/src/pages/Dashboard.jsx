import BalanceCard from '@/components/BalanceCard'
import P2PTransactions from '@/components/P2PTransactions'
import WalletTransactions from '@/components/WalletTransactions'
import { BadgeIndianRupee } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-7xl mx-auto lg:px-8 py-10">
      {/* Heading */}
      <div className="text-center mb-8 ">
        <h1 className="inline-block curved-underline font-[Geist] text-2xl lg:text-3xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Main layout */}
      <div className='flex flex-col smd:flex-row gap-3'>
        
        {/* Left Column (1/3 width) */}
        <div className="flex flex-col justify-between gap-4 xs:flex-row smd:flex-col smd:justify-normal">
          <div className="min-w-[300px] mx-auto xs:text-start xs:mx-0 ">
            <BalanceCard />
          </div>

          <div className="flex xs:flex-col gap-4">
            {/* Add Funds */}
            <div className="w-[280px] mx-auto xs:w-[280px] smd:w-[300px] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 font-[Geist] bg-indigo-700/60 rounded-lg px-3 py-2 shadow-md">
              <div className="flex flex-col">
                <span className="text-white text-sm xs:text-lg font-semibold">
                  Add Funds
                </span>
                <h2 className="text-xs xs:text-sm text-white font-medium opacity-90">
                  Top Up Wallet
                </h2>
              </div>

              <button
                onClick={() => navigate("/addFunds")}
                className="w-full xs:w-fit flex justify-center xs:justify-between items-center gap-1  cursor-pointer bg-white border px-2 py-1 text-lg font-semibold rounded-lg"
              >
                <span className="text-sm">Add</span>
                <BadgeIndianRupee className="w-5 h-5" />
              </button>
            </div>

            {/* P2P Transfer */}
            <div className="w-[280px] mx-auto xs:w-[280px] smd:w-[300px] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 font-[Geist] bg-gray-700/60 rounded-lg px-3 py-2 shadow-md">
              <div className="flex flex-col">
                <span className="text-white text-sm xs:text-lg font-semibold">
                  Send Money
                </span>
                <h2 className="text-xs xs:text-sm text-white font-medium opacity-90">
                  P2P Transfer
                </h2>
              </div>
              <button
                onClick={() => navigate("/p2pTransfer")}
                className="w-full xs:w-fit flex justify-center xs:justify-between items-center gap-1  cursor-pointer bg-white border px-2 py-1 text-lg font-semibold rounded-lg"
              >
                <span className="text-sm">Transfer</span>
                <BadgeIndianRupee className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (2/3 width) */}
        <div className="flex flex-col w-full gap-4">
          <P2PTransactions />
          <WalletTransactions showAllInCard={false}/>
        </div>
      </div>

    </div>
  );
}

export default Dashboard

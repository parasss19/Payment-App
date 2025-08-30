import { MyContext } from "@/context/MyContext";
import { Users } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { CalendarIcon } from "lucide-react"


const P2PTransactions = ({showAllInCard = false}) => {
  const navigate = useNavigate();

  const { p2pTransactions } = useContext(MyContext);

  const [showAll, setShowAll] = useState(false);    //to show all transactions in card in 
  const [searchDate, setSearchDate] = useState("");
   
  
  const filteredTxns = p2pTransactions.filter((txn) => {
    if (!searchDate) return true;

    //txn.date should be a valid date string, e.g. "2025-08-20" or "20 Aug 2025"
    const txnDate = new Date(txn.date).toDateString();
    return txnDate === searchDate.toDateString();
  });

  const visibleTxns = showAll ? filteredTxns : filteredTxns.slice(0, 5);



  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 font-[Geist] pr-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
            {" "}
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-[14px] xxs:text-[16px] sm:text-lg font-semibold text-gray-800">
            {" "}
            P2P Transactions
          </h2>
        </div>

        {showAllInCard ? (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        ) : (
          <button
            onClick={() => navigate("/transactions")}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            View All
          </button>
        )}
      </div>

      {/* Filter by date */}
      {showAllInCard && (
        <div className="mb-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchDate ? (
                  searchDate.toDateString()
                ) : (
                  <span>Filter by date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={searchDate}
                onSelect={setSearchDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* List */}
      <ul className={`space-y-3 font-[Geist] transition-all duration-300 ${ showAll ? "max-h-[355px] overflow-y-auto pr-1" : "" }`} >
        {visibleTxns.length > 0 ? (
          visibleTxns.map((txn) => (
            <li
              key={txn._id}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3 hover:bg-gray-100 transition"
            >
              <div>
                {/* 'From', 'to' details */}
                <p className="text-sm font-medium text-gray-700">
                  {txn.type === "credit" ? "From" : "To"}:{" "}
                  {txn.type === "credit" ? txn.fromUser?.firstName : txn.toUser?.firstName } 
                </p>

                {/* Transaction date */}
                <p className="text-xs text-gray-500">
                  {new Date(txn.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  txn.type === "credit"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {txn.type === "credit"
                  ? `+ ₹${txn.amount}`
                  : `- ₹${txn.amount}`}
              </span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-3">
            No P2P transactions yet
          </p>
        )}
      </ul>
    </div>
  );

};

export default P2PTransactions;

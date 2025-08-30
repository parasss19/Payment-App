import AddFundsCard from '@/components/AddFundsCard'
import Balance from '@/components/Balance'
import Filter from '@/components/Filter'
import WalletTransactions from '@/components/WalletTransactions'

const AddFunds = () => {

  return (
    <div className='min-h-screen max-w-7xl mx-auto lg:px-8 pt-10'>
      {/* Heading */}
      <div className="text-center mb-8 ">
        <h1 className="inline-block curved-underline font-[Geist] text-2xl lg:text-3xl font-semibold">
          Top Up Wallet
        </h1>
      </div>
      
      {/* Main Content */}
      <div className='max-w-md mx-auto md:max-w-full md:mx-0 grid grid-cols-1 gap-4 my-10 md:grid-cols-3'>
        {/* Add funds */}
        <div className='md:col-span-1 flex flex-col gap-6'>
          <AddFundsCard/>
          <Balance/>
        </div>
      
        {/* Search user */}
        <div className='md:col-span-2'>
          <WalletTransactions  showAllInCard={true} />
        </div>
      </div>

    </div>
  )
}

export default AddFunds
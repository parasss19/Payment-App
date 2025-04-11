import AllUsers from '@/components/AllUsers'
import BalanceCard from '@/components/BalanceCard'
import Filter from '@/components/Filter'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      {/* Balance Card */}
      <BalanceCard/>

      {/* Filter */}
      <Filter/>

      {/* All users */}
      <AllUsers/>
    </div>
  )
}

export default Dashboard
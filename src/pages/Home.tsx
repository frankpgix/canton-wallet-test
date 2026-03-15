import type { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SetToken from '../components/SetToken'
import { TapTab, TransactionsTab, TransferTab, WalletBalanceTab } from './HomeTabs'

const Home: FC = () => {
  return (
    <div className="page-home">
      <h1 className="page-home__title">Wallet API Tester</h1>

      {/* Token Management Section */}
      <SetToken />

      {/* Main Content Area with Vertical Tabs */}
      <div className="page-home__content-area">
        <Tabs defaultValue="wallet-balance" className="page-home__tabs-container">
          {/* Left Side: Vertical Tab List */}
          <TabsList className="page-home__tabs-sidebar">
            <TabsTrigger value="wallet-balance" className="page-home__tabs-trigger">
              Wallet Balance
            </TabsTrigger>
            <TabsTrigger value="transactions" className="page-home__tabs-trigger">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="tap" className="page-home__tabs-trigger">
              Tap
            </TabsTrigger>
            <TabsTrigger value="transfer" className="page-home__tabs-trigger">
              Transfer
            </TabsTrigger>
          </TabsList>

          {/* Right Side: Tab Content Area */}
          <div className="flex-1">
            <TabsContent
              value="wallet-balance"
              className="page-home__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <WalletBalanceTab />
            </TabsContent>

            <TabsContent
              value="transactions"
              className="page-home__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <TransactionsTab />
            </TabsContent>

            <TabsContent
              value="tap"
              className="page-home__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <TapTab />
            </TabsContent>

            <TabsContent
              value="transfer"
              className="page-home__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <TransferTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Home

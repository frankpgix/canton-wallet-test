import type { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TapTab, TransactionsTab, TransferTab, WalletBalanceTab } from './tabs'

const APITest: FC = () => {
  return (
    <div className="page-api-test">
      {/* Main Content Area with Vertical Tabs */}
      <div className="page-api-test__content-area">
        <Tabs defaultValue="wallet-balance" className="page-api-test__tabs-container">
          {/* Left Side: Vertical Tab List */}
          <TabsList className="page-api-test__tabs-sidebar">
            <TabsTrigger value="wallet-balance" className="page-api-test__tabs-trigger">
              Wallet Balance
            </TabsTrigger>
            <TabsTrigger value="transactions" className="page-api-test__tabs-trigger">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="tap" className="page-api-test__tabs-trigger">
              Tap
            </TabsTrigger>
            <TabsTrigger value="transfer" className="page-api-test__tabs-trigger">
              Transfer
            </TabsTrigger>
          </TabsList>

          {/* Right Side: Tab Content Area */}
          <div className="flex-1">
            <TabsContent
              value="wallet-balance"
              className="page-api-test__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <WalletBalanceTab />
            </TabsContent>

            <TabsContent
              value="transactions"
              className="page-api-test__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <TransactionsTab />
            </TabsContent>

            <TabsContent
              value="tap"
              className="page-api-test__tabs-content data-[state=inactive]:hidden"
              forceMount
            >
              <TapTab />
            </TabsContent>

            <TabsContent
              value="transfer"
              className="page-api-test__tabs-content data-[state=inactive]:hidden"
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

export default APITest

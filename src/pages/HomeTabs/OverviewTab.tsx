import type { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const OverviewTab: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>View your wallet balance and recent activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <h2 className="text-2xl font-bold mt-1">$12,345.67</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          This is a demo content area for the Overview tab. You can place your charts, statistics,
          and main dashboard components here.
        </p>
      </CardContent>
    </Card>
  )
}

export default OverviewTab

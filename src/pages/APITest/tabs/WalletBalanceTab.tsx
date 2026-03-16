import { type FC, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getWalletBalance } from '@/api/wallet'

const WalletBalanceTab: FC = () => {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setResponse('')
    try {
      const res = await getWalletBalance()
      setResponse(JSON.stringify(res, null, 2))
    } catch (error) {
      setResponse(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResponse('')
    setLoading(false)
  }

  return (
    <Card className="comp-api-test-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary">GET /wallet/balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Parameters Form (Empty for this endpoint) */}
        <div className="text-sm text-muted-foreground italic">
          No parameters required for this endpoint.
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
          <Button onClick={handleReset} variant="outline" disabled={loading}>
            Reset
          </Button>
        </div>

        {/* Response Display */}
        {response && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Response:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono whitespace-pre-wrap break-all">
              {response}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default WalletBalanceTab

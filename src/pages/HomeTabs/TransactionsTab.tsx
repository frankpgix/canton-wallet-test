import { type FC, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getTransactions } from '@/api/wallet'

const TransactionsTab: FC = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setResponse('')
    try {
      const res = await getTransactions({ page_size: pageSize })
      setResponse(JSON.stringify(res, null, 2))
    } catch (error) {
      setResponse(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPageSize(10)
    setResponse('')
    setLoading(false)
  }

  return (
    <Card className="comp-api-test-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary">POST /wallet/transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Parameters Form */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pageSize">Page Size</Label>
          <Input
            type="number"
            id="pageSize"
            placeholder="10"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            min={1}
          />
          <p className="text-xs text-muted-foreground">
            Number of transactions to return per page.
          </p>
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

export default TransactionsTab

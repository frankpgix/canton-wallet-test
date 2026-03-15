import { type FC, useState } from 'react'
import { tap } from '@/api/wallet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const TapTab: FC = () => {
  const [amount, setAmount] = useState<string>('100.0')
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setResponse('')
    try {
      const res = await tap({ amount })
      setResponse(JSON.stringify(res, null, 2))
    } catch (error) {
      setResponse(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setAmount('100.0')
    setResponse('')
    setLoading(false)
  }

  return (
    <Card className="comp-api-test-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary">POST /wallet/tap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Parameters Form */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="text"
            id="amount"
            placeholder="100.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The amount to tap.</p>
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

export default TapTab

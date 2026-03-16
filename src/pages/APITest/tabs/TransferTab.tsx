import { type FC, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { transfer } from '@/api/wallet'

const TransferTab: FC = () => {
  const [receiverPartyId, setReceiverPartyId] = useState<string>('')
  const [amount, setAmount] = useState<string>('1.0')
  const [description, setDescription] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<string>('1') // Default to 1 day
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setResponse('')

    // Calculate expires_at in microseconds
    // Current time + days * 24 hours * 60 minutes * 60 seconds * 1000000 microseconds
    const now = Date.now() // milliseconds
    const daysInMs = Number(expiresIn) * 24 * 60 * 60 * 1000
    const expiresAt = (now + daysInMs) * 1000 // Convert total milliseconds to microseconds

    // Construct request data
    const requestData = {
      receiver_party_id: receiverPartyId,
      amount: amount,
      description: description,
      expires_at: expiresAt,
      tracking_id: crypto.randomUUID(), // Generate a unique tracking ID
    }

    try {
      const res = await transfer(requestData)
      setResponse(JSON.stringify(res, null, 2))
    } catch (error) {
      setResponse(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setReceiverPartyId('')
    setAmount('1.0')
    setDescription('')
    setExpiresIn('1')
    setResponse('')
    setLoading(false)
  }

  return (
    <Card className="comp-api-test-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-primary">
          POST /wallet/token-standard/transfers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Parameters Form */}
        <div className="grid w-full max-w-sm items-center gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="receiverPartyId">Receiver Party ID</Label>
            <Input
              type="text"
              id="receiverPartyId"
              placeholder="e.g. al1510-3::1220..."
              value={receiverPartyId}
              onChange={(e) => setReceiverPartyId(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="text"
              id="amount"
              placeholder="1.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="expiresIn">Expires In</Label>
            <Select value={expiresIn} onValueChange={setExpiresIn}>
              <SelectTrigger id="expiresIn">
                <SelectValue placeholder="Select expiration time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Day</SelectItem>
                <SelectItem value="10">10 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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

export default TransferTab

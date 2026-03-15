import { Check, RotateCcw } from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const SetToken: FC = () => {
  const [token, setToken] = useState('')
  const [isTokenSet, setIsTokenSet] = useState(false)

  // Load token from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      setIsTokenSet(true)
    }
  }, [])

  // Handle saving the token
  const handleSaveToken = () => {
    if (!token.trim()) {
      alert('Please enter a valid token')
      return
    }
    localStorage.setItem('token', token.trim())
    setIsTokenSet(true)
  }

  // Handle resetting the token
  const handleResetToken = () => {
    localStorage.removeItem('token')
    setToken('')
    setIsTokenSet(false)
  }

  return (
    <Card className="comp-set-token">
      <CardHeader>
        <CardTitle>Request Token Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        {!isTokenSet ? (
          <div className="comp-set-token__input-group">
            <Textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT Token here..."
              className="comp-set-token__textarea"
            />
            <Button onClick={handleSaveToken} className="w-fit">
              Set Request Token
            </Button>
          </div>
        ) : (
          <div className="comp-set-token__display-group">
            <div className="comp-set-token__status">
              <Check className="w-5 h-5" />
              Token is currently set
            </div>

            <div className="comp-set-token__preview">
              {token.slice(0, 20)}...{token.slice(-20)}
            </div>

            <Button onClick={handleResetToken} variant="destructive" className="w-fit gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset Request Token
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SetToken

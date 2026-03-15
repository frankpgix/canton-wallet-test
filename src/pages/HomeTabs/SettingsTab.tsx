import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SettingsTab: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Settings</CardTitle>
        <CardDescription>Manage your preferences and security options.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Settings configuration area goes here.</p>
        <Link to="/about" className="text-primary hover:underline text-sm font-medium">
          Go to About Page &rarr;
        </Link>
      </CardContent>
    </Card>
  )
}

export default SettingsTab

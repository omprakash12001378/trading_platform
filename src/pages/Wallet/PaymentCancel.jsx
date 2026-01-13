import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PaymentCancel = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[90%] sm:w-[60%] lg:w-[40%]">
        <CardHeader>
          <div className="flex items-center gap-4">
            <XCircle className="h-8 w-8 text-rose-500" />
            <CardTitle className="text-xl">Payment Cancelled</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-6">Your payment was cancelled or could not be completed.</p>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
            <Button onClick={() => navigate('/wallet')}>Open Wallet</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentCancel


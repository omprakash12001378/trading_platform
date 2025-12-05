import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { CreditCardIcon, BuildingIcon, UserIcon, HashIcon, PlusIcon, CheckCircle2Icon } from "lucide-react";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Payment Details</span>
        </h1>
        <p className="text-gray-400">Manage your bank account information for withdrawals</p>
      </div>

      {withdrawal.paymentDetails ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2Icon className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Payment Method Configured</h2>
                  <p className="text-sm text-gray-400">Your bank account is ready for withdrawals</p>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-500"
                  >
                    Update Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
                  <DialogHeader className="pb-5">
                    <DialogTitle>Update Payment Details</DialogTitle>
                  </DialogHeader>
                  <PaymentDetailsForm onSuccess={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Bank Details Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-effect rounded-xl p-6 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <BuildingIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Bank Name</p>
                    <p className="font-bold text-lg">{withdrawal.paymentDetails?.bankName.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CreditCardIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Account Number</p>
                    <p className="font-bold text-lg font-mono">{maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <UserIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Account Holder</p>
                    <p className="font-bold text-lg">{withdrawal.paymentDetails.accountHolderName}</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <HashIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">IFSC Code</p>
                    <p className="font-bold text-lg font-mono">{withdrawal.paymentDetails.ifsc.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="glass-effect rounded-xl p-6 border border-blue-500/10 bg-blue-500/5">
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 h-fit">
                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">Important Information</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Ensure your bank details are accurate to avoid withdrawal delays</li>
                  <li>• Withdrawals typically process within 1-3 business days</li>
                  <li>• You can update your payment details anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-effect rounded-2xl p-12 border border-emerald-500/10 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mx-auto mb-6">
              <CreditCardIcon className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No Payment Details Found</h2>
            <p className="text-gray-400 mb-6">
              Add your bank account details to enable withdrawals from your wallet
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20 px-8 py-6 text-lg">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Add Payment Details
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
                <DialogHeader className="pb-5">
                  <DialogTitle>Add Payment Details</DialogTitle>
                </DialogHeader>
                <PaymentDetailsForm onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;

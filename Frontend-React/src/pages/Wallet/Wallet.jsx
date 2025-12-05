import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/Redux/Wallet/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CopyIcon,
  DownloadIcon,
  ReloadIcon,
  ShuffleIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DollarSign, WalletIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopupForm from "./TopupForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const orderId = query.get("order_id");
  const { order_id } = useParams();

  useEffect(() => {
    if (orderId || order_id) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId: orderId || order_id,
          paymentId: razorpayPaymentId || "AuedkfeuUe",
          navigate,
        })
      );
      console.log(paymentId, orderId);
    }
  }, [paymentId, orderId, razorpayPaymentId]);

  useEffect(() => {
    handleFetchUserWallet();
    hanldeFetchWalletTransactions();
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const hanldeFetchWalletTransactions = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  function copyToClipboard(text) {
    // Create a new element
    const element = document.createElement("textarea");
    element.value = text;
    document.body.appendChild(element);

    // Select the text content
    element.select();

    // Try copying the selection using Async Clipboard API
    try {
      const copied = navigator.clipboard.writeText(text);
      copied.then(
        () => {
          console.log("Text copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        }
      );
    } catch (err) {
      console.error(
        "Failed to copy text (fallback to deprecated execCommand): ",
        err
      );
    }

    // Cleanup
    document.body.removeChild(element);
  }

  console.log("order _ id", order_id);
  if (wallet.loading) {
    return <SpinnerBackdrop />
  }

  return (
    <div className="flex flex-col items-center fade-in">
      <div className="pt-10 w-full lg:w-[70%] xl:w-[60%] px-4">
        <Card className="glass-effect border-emerald-500/20 card-hover">
          <CardHeader className="pb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <WalletIcon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold gradient-text">My Wallet</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-400 text-sm font-mono">
                      #FAVHJY{wallet.userWallet?.id}
                    </p>
                    <CopyIcon
                      onClick={() => copyToClipboard(wallet.userWallet?.id)}
                      className="cursor-pointer hover:text-emerald-400 transition-colors h-4 w-4"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button
                  onClick={handleFetchUserWallet}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <ReloadIcon className="w-6 h-6 hover:rotate-180 transition-transform duration-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-8">
              <DollarSign className="h-8 w-8 text-emerald-400" />
              <span className="text-5xl font-bold gradient-text number-pop">
                {wallet.userWallet?.balance?.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <Dialog>
                <DialogTrigger>
                  <div className="h-28 glass-effect rounded-xl hover:bg-emerald-500/10 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 card-hover border border-emerald-500/20 group">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <UploadIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="glass-effect border-emerald-500/20 p-8">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl gradient-text mb-4">
                      Top Up Your Wallet
                    </DialogTitle>
                    <TopupForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-28 glass-effect rounded-xl hover:bg-emerald-500/10 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 card-hover border border-emerald-500/20 group">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <DownloadIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold">Withdraw</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="glass-effect border-emerald-500/20 p-8">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl gradient-text mb-4">
                      Request Withdrawal
                    </DialogTitle>
                    <WithdrawForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-28 glass-effect rounded-xl hover:bg-emerald-500/10 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 card-hover border border-emerald-500/20 group">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <ShuffleIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="glass-effect border-emerald-500/20 p-8">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl gradient-text mb-4">
                      Transfer To Other Wallet
                    </DialogTitle>
                    <TransferForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 pt-12">
          <div className="flex gap-3 items-center pb-6">
            <h1 className="text-3xl font-bold gradient-text">Transaction History</h1>
            <Button
              onClick={hanldeFetchWalletTransactions}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-emerald-500/10 transition-all duration-300"
            >
              <UpdateIcon className="h-6 w-6 hover:rotate-180 transition-transform duration-500" />
            </Button>
          </div>

          <div className="space-y-4">
            {wallet.transactions?.map((item, index) => (
              <div key={index}>
                <Card className="glass-effect border-emerald-500/10 px-6 py-4 flex justify-between items-center card-hover hover:border-emerald-500/30 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-12 w-12 ring-2 ring-emerald-500/20">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                        <ShuffleIcon className="h-5 w-5 text-emerald-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h1 className="font-semibold text-lg">{item.type || item.purpose}</h1>
                      <p className="text-sm text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className={`text-xl font-bold ${item.amount > 0 ? "status-positive" : "status-negative"}`}>
                      {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toLocaleString()} USD
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;


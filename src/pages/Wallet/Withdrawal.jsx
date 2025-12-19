import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownIcon, ClockIcon, CheckCircle2Icon, XCircleIcon, TrendingDownIcon, WalletIcon } from "lucide-react";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);

  // Calculate stats
  const totalWithdrawals = withdrawal.history?.length || 0;
  const totalAmount = withdrawal.history?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  const pendingCount = withdrawal.history?.filter(item => item.status === "PENDING").length || 0;
  const completedCount = withdrawal.history?.filter(item => item.status === "SUCCESS").length || 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2Icon className="h-4 w-4" />;
      case 'PENDING':
        return <ClockIcon className="h-4 w-4" />;
      case 'FAILED':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'FAILED':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Withdrawal History</span>
        </h1>
        <p className="text-gray-400">Track all your withdrawal transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Withdrawals</p>
            <TrendingDownIcon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold">{totalWithdrawals}</h2>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Amount</p>
            <WalletIcon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">₹{totalAmount.toLocaleString()}</h2>
          <p className="text-xs text-gray-500 mt-1">Withdrawn</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Completed</p>
            <CheckCircle2Icon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-400">{completedCount}</h2>
          <p className="text-xs text-gray-500 mt-1">{totalWithdrawals > 0 ? ((completedCount / totalWithdrawals) * 100).toFixed(0) : 0}% success rate</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Pending</p>
            <ClockIcon className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-400">{pendingCount}</h2>
          <p className="text-xs text-gray-500 mt-1">In progress</p>
        </div>
      </div>

      {/* Withdrawal History Table */}
      <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ArrowDownIcon className="h-5 w-5 text-emerald-500" />
          Transaction History
        </h2>

        {withdrawal.history && withdrawal.history.length > 0 ? (
          <Table className="relative">
            <TableHeader>
              <TableRow className="border-b border-emerald-500/20 hover:bg-transparent">
                <TableHead className="py-5 font-semibold text-emerald-400">DATE & TIME</TableHead>
                <TableHead className="font-semibold text-emerald-400">METHOD</TableHead>
                <TableHead className="font-semibold text-emerald-400">AMOUNT</TableHead>
                <TableHead className="text-right font-semibold text-emerald-400">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawal.history.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-all duration-200"
                >
                  <TableCell className="font-medium py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold">{readableTimestamp(item?.date)}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(item?.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <WalletIcon className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="font-medium">Bank Account</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-lg">₹{item.amount?.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${getStatusColor(item.status)} border px-3 py-1 flex items-center gap-1 w-fit ml-auto`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <ArrowDownIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">No withdrawal history</p>
            <p className="text-sm mt-2">Your withdrawal transactions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;

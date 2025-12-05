import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForUser } from '@/Redux/Order/Action';
import { getUserWallet, getWalletTransactions } from '@/Redux/Wallet/Action';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon, TrendingDownIcon, ActivityIcon, WalletIcon, ShoppingCartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, wallet } = useSelector((store) => store);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem('jwt') }));
    dispatch(getUserWallet(localStorage.getItem('jwt')));
    dispatch(getWalletTransactions({ jwt: localStorage.getItem('jwt') }));
  }, [dispatch]);

  // Combine all activities
  const allActivities = [
    ...(order.orders || []).map(o => ({
      id: `order-${o.id}`,
      type: o.orderType === 'BUY' ? 'buy' : 'sell',
      timestamp: o.timestamp,
      coin: o.orderItem?.coin,
      amount: o.price,
      quantity: o.quantity,
      status: o.status,
      orderType: o.orderType
    })),
    ...(wallet.transactions || []).map(t => ({
      id: `transaction-${t.id}`,
      type: t.type?.toLowerCase() || 'deposit',
      timestamp: t.date,
      amount: t.amount,
      status: t.status || 'COMPLETED'
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Filter activities
  const filteredActivities = filterType === 'all'
    ? allActivities
    : allActivities.filter(a => a.type === filterType);

  // Calculate stats
  const totalTrades = (order.orders || []).length;
  const buyTrades = (order.orders || []).filter(o => o.orderType === 'BUY').length;
  const sellTrades = (order.orders || []).filter(o => o.orderType === 'SELL').length;
  const totalVolume = (order.orders || []).reduce((sum, o) => sum + (o.price || 0), 0);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'buy': return <ArrowDownIcon className="h-5 w-5 text-emerald-500" />;
      case 'sell': return <ArrowUpIcon className="h-5 w-5 text-rose-500" />;
      case 'deposit': return <WalletIcon className="h-5 w-5 text-blue-500" />;
      case 'withdrawal': return <WalletIcon className="h-5 w-5 text-orange-500" />;
      default: return <ActivityIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'buy': return 'border-emerald-500/20 bg-emerald-500/5';
      case 'sell': return 'border-rose-500/20 bg-rose-500/5';
      case 'deposit': return 'border-blue-500/20 bg-blue-500/5';
      case 'withdrawal': return 'border-orange-500/20 bg-orange-500/5';
      default: return 'border-gray-500/20 bg-gray-500/5';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Activity</span>
          </h1>
          <p className="text-gray-400">Track all your trading and wallet activities</p>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] h-11 border-emerald-500/20 hover:border-emerald-500/40 bg-card/50 backdrop-blur-sm transition-all duration-300 rounded-full">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="buy">Buy Orders</SelectItem>
            <SelectItem value="sell">Sell Orders</SelectItem>
            <SelectItem value="deposit">Deposits</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Trades</p>
            <ShoppingCartIcon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold">{totalTrades}</h2>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Buy Orders</p>
            <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-400">{buyTrades}</h2>
          <p className="text-xs text-gray-500 mt-1">{totalTrades > 0 ? ((buyTrades / totalTrades) * 100).toFixed(0) : 0}% of total</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Sell Orders</p>
            <TrendingDownIcon className="h-5 w-5 text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold text-rose-400">{sellTrades}</h2>
          <p className="text-xs text-gray-500 mt-1">{totalTrades > 0 ? ((sellTrades / totalTrades) * 100).toFixed(0) : 0}% of total</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Volume</p>
            <WalletIcon className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">${totalVolume.toLocaleString()}</h2>
          <p className="text-xs text-gray-500 mt-1">Traded value</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ActivityIcon className="h-5 w-5 text-emerald-500" />
          Recent Activity
        </h2>

        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <ActivityIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">No activities found</p>
            <p className="text-sm mt-2">Start trading to see your activity here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${getActivityColor(activity.type)} hover:border-emerald-500/40 transition-all duration-200 cursor-pointer group`}
                onClick={() => activity.coin && navigate(`/market/${activity.coin.id}`)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-full bg-card border border-emerald-500/20">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activity.coin && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.coin.image} />
                        </Avatar>
                      )}
                      <p className="font-semibold capitalize group-hover:text-emerald-400 transition-colors">
                        {activity.type} {activity.coin ? activity.coin.name : ''}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {activity.quantity && (
                    <p className="text-sm text-gray-400">
                      {activity.quantity} {activity.coin?.symbol?.toUpperCase()}
                    </p>
                  )}
                  <p className={`font-bold text-lg ${activity.type === 'buy' || activity.type === 'deposit'
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                    }`}>
                    {activity.type === 'sell' || activity.type === 'withdrawal' ? '-' : '+'}
                    ${activity.amount?.toLocaleString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${activity.status === 'SUCCESS' || activity.status === 'COMPLETED'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : activity.status === 'PENDING'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-gray-500/10 text-gray-500'
                    }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;

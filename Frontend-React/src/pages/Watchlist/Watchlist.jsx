import { useEffect } from "react";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getTop50CoinList } from "@/Redux/Coin/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist, coin } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getTop50CoinList());
  }, []);

  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };

  // Calculate Stats
  const watchlistItems = watchlist.items || [];
  const bestPerformer = [...watchlistItems].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)[0];
  const worstPerformer = [...watchlistItems].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)[0];

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <BookmarkFilledIcon className="h-8 w-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-1">
            <span className="gradient-text">My Watchlist</span>
          </h1>
          <p className="text-gray-400">Keep track of your favorite assets</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-medium">Watchlist Count</p>
            <h2 className="text-3xl font-bold mt-1">{watchlistItems.length}</h2>
            <p className="text-xs text-gray-500 mt-1">Coins tracked</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <BookmarkIcon className="h-6 w-6 text-emerald-500" />
          </div>
        </div>

        {bestPerformer && (
          <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover cursor-pointer" onClick={() => navigate(`/market/${bestPerformer.id}`)}>
            <p className="text-sm text-gray-400 font-medium">Best Performer (24h)</p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={bestPerformer.image} />
              </Avatar>
              <div>
                <p className="font-bold">{bestPerformer.name}</p>
                <p className="text-emerald-400 font-semibold text-sm">
                  +{bestPerformer.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {worstPerformer && (
          <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover cursor-pointer" onClick={() => navigate(`/market/${worstPerformer.id}`)}>
            <p className="text-sm text-gray-400 font-medium">Worst Performer (24h)</p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={worstPerformer.image} />
              </Avatar>
              <div>
                <p className="font-bold">{worstPerformer.name}</p>
                <p className="text-rose-400 font-semibold text-sm">
                  {worstPerformer.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="glass-effect rounded-2xl p-6 card-hover border border-emerald-500/10 mb-12">
        <Table className="relative">
          <TableHeader>
            <TableRow className="border-b border-emerald-500/20 hover:bg-transparent">
              <TableHead className="py-5 font-semibold text-emerald-400">ASSET</TableHead>
              <TableHead className="font-semibold text-emerald-400">SYMBOL</TableHead>
              <TableHead className="font-semibold text-emerald-400">PRICE</TableHead>
              <TableHead className="font-semibold text-emerald-400">MARKET CAP</TableHead>
              <TableHead className="font-semibold text-emerald-400">24H CHANGE</TableHead>
              <TableHead className="text-right font-semibold text-emerald-400">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlistItems.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-all duration-200 group"
              >
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-200">
                      <AvatarImage src={item.image} alt={item.symbol} />
                    </Avatar>
                    <span className="font-semibold text-lg group-hover:text-emerald-400 transition-colors"> {item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 font-medium">{item.symbol.toUpperCase()}</TableCell>
                <TableCell className="font-bold">
                  ${item.current_price?.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-gray-400">
                  ${item.market_cap?.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`font-semibold ${item.market_cap_change_percentage_24h < 0
                    ? "status-negative"
                    : "status-positive"
                    }`}
                >
                  {item.market_cap_change_percentage_24h > 0 ? "+" : ""}
                  {item.market_cap_change_percentage_24h?.toFixed(2)}%
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWatchlist(item.id);
                    }}
                    className="h-10 w-10 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500"
                    size="icon"
                  >
                    <BookmarkFilledIcon className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Trending / Suggestions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Assets</h2>
          <Button variant="outline" className="border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500" onClick={() => navigate("/market")}>
            View All Market
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {coin.top50?.filter(c => !watchlistItems.some(w => w.id === c.id)).slice(0, 4).map((item) => (
            <div key={item.id} className="glass-effect rounded-2xl p-5 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover group cursor-pointer" onClick={() => navigate(`/market/${item.id}`)}>
              <div className="flex justify-between items-start mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                  <AvatarImage src={item.image} />
                </Avatar>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-emerald-500/10 hover:text-emerald-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWatchlist(item.id);
                  }}
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              </div>

              <div>
                <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors truncate">{item.name}</h3>
                <p className="text-sm text-gray-400 uppercase mb-2">{item.symbol}</p>

                <div className="flex justify-between items-end mt-4">
                  <p className="font-bold text-lg">${item.current_price?.toLocaleString()}</p>
                  <p className={`text-sm font-semibold ${item.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.price_change_percentage_24h > 0 ? "+" : ""}
                    {item.price_change_percentage_24h?.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;


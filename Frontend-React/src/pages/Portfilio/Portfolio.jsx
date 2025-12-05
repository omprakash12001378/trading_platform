/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "../Home/AssetTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getTop50CoinList } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TreadingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";

const tab = ["portfolio", "history"];
const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset, coin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getTop50CoinList());
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // Calculate Portfolio Stats
  const totalValue = asset.userAssets?.reduce(
    (acc, item) => acc + item.coin.current_price * item.quantity,
    0
  );

  const totalChange = asset.userAssets?.reduce(
    (acc, item) => acc + item.coin.price_change_24h * item.quantity,
    0
  );

  const totalChangePercent =
    totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">My Portfolio</span>
          </h1>
          <p className="text-gray-400">Track your assets and trading history</p>
        </div>
        <div className="flex gap-3">
          <Select
            onValueChange={handleTabChange}
            defaultValue="portfolio"
          >
            <SelectTrigger className="w-[180px] h-11 border-emerald-500/20 hover:border-emerald-500/40 bg-card/50 backdrop-blur-sm transition-all duration-300 rounded-full">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
              <SelectItem value="portfolio" className="hover:bg-emerald-500/10 cursor-pointer">
                <span className="font-medium">Portfolio</span>
              </SelectItem>
              <SelectItem value="history" className="hover:bg-emerald-500/10 cursor-pointer">
                <span className="font-medium">Trading History</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {currentTab == "portfolio" ? (
        <div className="space-y-8">
          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <WalletIcon className="h-24 w-24 text-emerald-500" />
              </div>
              <p className="text-sm text-gray-400 mb-1 font-medium">Total Balance</p>
              <h2 className="text-3xl font-bold gradient-text">
                ${totalValue?.toLocaleString()}
              </h2>
              <p className="text-xs text-gray-500 mt-2">Across all assets</p>
            </div>

            <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
              <p className="text-sm text-gray-400 mb-1 font-medium">24h Profit/Loss</p>
              <div className="flex items-end gap-2">
                <h2
                  className={`text-3xl font-bold ${totalChange >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                >
                  {totalChange >= 0 ? "+" : ""}
                  ${Math.abs(totalChange)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <p
                className={`text-xs mt-2 font-semibold flex items-center ${totalChangePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
              >
                {totalChangePercent >= 0 ? (
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 mr-1" />
                )}
                {Math.abs(totalChangePercent).toFixed(2)}%
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover flex flex-col justify-center items-center text-center">
              <p className="text-sm text-gray-400 mb-2 font-medium">Asset Count</p>
              <h2 className="text-4xl font-bold text-foreground">
                {asset.userAssets?.length || 0}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Active Holdings</p>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 card-hover border border-emerald-500/10">
            <Table className="relative">
              <TableHeader>
                <TableRow className="border-b border-emerald-500/20 hover:bg-transparent">
                  <TableHead className="py-5 font-semibold text-emerald-400">ASSET</TableHead>
                  <TableHead className="font-semibold text-emerald-400">PRICE</TableHead>
                  <TableHead className="font-semibold text-emerald-400">HOLDINGS</TableHead>
                  <TableHead className="font-semibold text-emerald-400">24H CHANGE</TableHead>
                  <TableHead className="font-semibold text-emerald-400">ALLOCATION</TableHead>
                  <TableHead className="text-right font-semibold text-emerald-400">TOTAL VALUE</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {asset.userAssets?.map((item) => {
                  const assetValue = item.coin.current_price * item.quantity;
                  const allocation = totalValue > 0 ? (assetValue / totalValue) * 100 : 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/market/${item.coin.id}`)}
                      key={item.id}
                      className="cursor-pointer border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-all duration-200 group"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-200">
                            <AvatarImage
                              src={item.coin.image}
                              alt={item.coin.symbol}
                            />
                          </Avatar>
                          <div>
                            <span className="font-semibold text-base group-hover:text-emerald-400 transition-colors block">
                              {item.coin.name}
                            </span>
                            <span className="text-xs text-gray-500 uppercase">{item.coin.symbol}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">
                        ${item.coin.current_price?.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-foreground">{item.quantity} {item.coin.symbol.toUpperCase()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span
                            className={`font-semibold ${item.coin.price_change_percentage_24h < 0
                              ? "status-negative"
                              : "status-positive"
                              }`}
                          >
                            {item.coin.price_change_percentage_24h > 0 ? "+" : ""}
                            {item.coin.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            ${item.coin.price_change_24h?.toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="w-[15%]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                              style={{ width: `${allocation}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8">{allocation.toFixed(0)}%</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <span className="font-bold text-lg gradient-text">
                          ${assetValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Coin Suggestions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coin.top50?.filter(c => !asset.userAssets?.some(a => a.coin.id === c.id)).slice(0, 3).map((item) => (
                <div key={item.id} className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover group cursor-pointer" onClick={() => navigate(`/market/${item.id}`)}>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                      <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="text-xl font-bold">${item.current_price?.toLocaleString()}</p>
                    </div>
                    <div className={`text-right ${item.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <p className="font-bold text-lg flex items-center justify-end">
                        {item.price_change_percentage_24h >= 0 ? <TrendingUpIcon className="h-4 w-4 mr-1" /> : <TrendingDownIcon className="h-4 w-4 mr-1" />}
                        {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TreadingHistory />
      )}
    </div>
  );
};

// Icons
const WalletIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const TrendingDownIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);

export default Portfolio;


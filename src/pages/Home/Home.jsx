/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import {
  ChevronLeftIcon,
  Cross1Icon,
  DotIcon,
} from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { sendMessage } from "@/Redux/Chat/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import MarketTicker from "./MarketTicker";
import HeroSection from "./HeroSection";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, chatBot, auth } = useSelector((store) => store);
  const [isBotRelease, setIsBotRelease] = useState(false);

  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: "bitcoin",
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, []);

  useEffect(() => {
    if (category == "top50") {
      dispatch(getTop50CoinList());
    } else if (category == "trading") {
      dispatch(fetchTreadingCoinList());
    }
  }, [category]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed:", inputValue);
      dispatch(
        sendMessage({
          prompt: inputValue,
          jwt: auth.jwt || localStorage.getItem("jwt"),
        })
      );
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  // Calculate top gainer and loser
  const allCoins = coin.coinList || [];
  const sortedByChange = [...allCoins].sort(
    (a, b) =>
      b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="relative fade-in min-h-screen flex flex-col">
      {/* Market Ticker */}
      <MarketTicker coins={coin.coinList} />

      <div className="flex-1 p-4 lg:p-6 max-w-[1600px] mx-auto w-full">
        {/* Hero Section */}
        <HeroSection auth={auth} topGainer={topGainer} topLoser={topLoser} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Asset Table (1/2 width) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Market Trends</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={category == "all" ? "default" : "outline"}
                  onClick={() => setCategory("all")}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${category == "all"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30"
                    : "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                    }`}
                >
                  All Coins
                </Button>
                <Button
                  variant={category == "top50" ? "default" : "outline"}
                  onClick={() => setCategory("top50")}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${category == "top50"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30"
                    : "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                    }`}
                >
                  Top 50
                </Button>
              </div>
            </div>

            <div className="glass-effect rounded-2xl border border-emerald-500/10 overflow-hidden shadow-lg shadow-emerald-500/5">
              <AssetTable
                category={category}
                coins={category == "all" ? coin.coinList : coin.top50}
              />
              {category == "all" && (
                <Pagination className="border-t border-emerald-500/10 py-4 bg-card/30">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        disabled={page == 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="hover:bg-emerald-500/10 disabled:opacity-50"
                      >
                        <ChevronLeftIcon className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(1)}
                        isActive={page == 1}
                        className={
                          page == 1
                            ? "bg-emerald-500/20 border-emerald-500/40"
                            : "hover:bg-emerald-500/10"
                        }
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {/* Simplified pagination for cleaner look */}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(page + 1)}
                        className="hover:bg-emerald-500/10"
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer hover:bg-emerald-500/10"
                        onClick={() => handlePageChange(page + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>

          {/* Right Side: Featured Coin (1/2 width) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Featured Coin</h2>
            <div className="sticky top-24 space-y-6">
              <div
                onClick={() => coin.coinDetails?.id && window.location.assign(`/market/${coin.coinDetails.id}`)}
                className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover cursor-pointer group"
              >
                <div className="flex gap-4 items-center mb-6">
                  <Avatar className="h-14 w-14 ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/50 transition-all">
                    <AvatarImage src={coin.coinDetails?.image?.large} />
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                        {coin.coinDetails?.symbol?.toUpperCase()}
                      </p>
                      <span className="badge-premium text-xs">Rank #{coin.coinDetails?.market_cap_rank}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{coin.coinDetails?.name}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold gradient-text mb-1">
                    $
                    {coin.coinDetails?.market_data.current_price.usd?.toLocaleString()}
                  </p>
                  <p
                    className={`flex items-center text-sm font-semibold ${coin.coinDetails?.market_data.market_cap_change_24h < 0
                      ? "status-negative"
                      : "status-positive"
                      }`}
                  >
                    {coin.coinDetails?.market_data.market_cap_change_24h > 0
                      ? "+"
                      : ""}
                    {coin.coinDetails?.market_data.market_cap_change_24h?.toFixed(
                      2
                    )}
                    <span className="ml-1 opacity-80">
                      (
                      {coin.coinDetails?.market_data.market_cap_change_percentage_24h?.toFixed(
                        2
                      )}
                      %)
                    </span>
                  </p>
                </div>

                <div className="chart-container p-0 border-none shadow-none bg-transparent mb-4 h-[200px]">
                  <StockChart coinId={"bitcoin"} height={200} showControls={false} />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-xl bg-card/50 border border-emerald-500/10">
                    <p className="text-xs text-gray-400 mb-1">Market Cap</p>
                    <p className="font-semibold text-sm">
                      ${(coin.coinDetails?.market_data.market_cap.usd / 1000000000).toFixed(2)}B
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-card/50 border border-emerald-500/10">
                    <p className="text-xs text-gray-400 mb-1">Volume (24h)</p>
                    <p className="font-semibold text-sm">
                      ${(coin.coinDetails?.market_data.total_volume.usd / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Button & Chat */}
      <section className="fixed bottom-6 right-6 z-40 flex flex-col justify-end items-end gap-3">
        {isBotRelease && (
          <div className="rounded-2xl w-[20rem] md:w-[26rem] lg:w-[28rem] h-[75vh] glass-effect shadow-2xl shadow-emerald-500/20 slide-in-right flex flex-col">
            <div className="flex justify-between items-center border-b border-emerald-500/20 px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-400/10 rounded-t-2xl">
              <p className="text-lg font-semibold gradient-text">
                AI Trading Assistant
              </p>
              <Button
                onClick={handleBotRelease}
                size="icon"
                variant="ghost"
                className="hover:bg-emerald-500/10 rounded-full h-8 w-8"
              >
                <Cross1Icon />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto gap-5 px-6 py-4 scroll-container">
              <div className="self-start pb-5 w-auto">
                <div className="px-5 py-3 rounded-xl glass-effect border border-emerald-500/20">
                  <p className="font-medium">Hi, {auth.user?.fullName}! 👋</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Ask me anything about crypto:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-400 flex items-center gap-2">
                      <DotIcon className="text-emerald-500" /> Prices & Market Cap
                    </li>
                    <li className="text-sm text-gray-400 flex items-center gap-2">
                      <DotIcon className="text-emerald-500" /> Trading Insights
                    </li>
                    <li className="text-sm text-gray-400 flex items-center gap-2">
                      <DotIcon className="text-emerald-500" /> Market Trends
                    </li>
                  </ul>
                </div>
              </div>
              {chatBot.messages.map((item, index) => (
                <div
                  ref={chatContainerRef}
                  key={index}
                  className={`${item.role == "user" ? "self-end ml-auto" : "self-start"
                    } pb-3 w-auto max-w-[85%]`}
                >
                  {item.role == "user" ? (
                    <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                      {item.prompt}
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="glass-effect border border-emerald-500/20 py-4 px-5 rounded-xl">
                        <p>{item.ans}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {chatBot.loading && (
                <div className="self-start">
                  <div className="glass-effect px-5 py-3 rounded-xl shimmer">
                    <p className="text-sm text-gray-400">Analyzing data...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-emerald-500/20">
              <div className="relative">
                <Input
                  className="w-full h-12 rounded-full border border-emerald-500/20 bg-card/50 px-6 pr-12 focus-visible:ring-1 focus-visible:ring-emerald-500"
                  placeholder="Ask about crypto prices, trends..."
                  onChange={handleChange}
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-emerald-500/10 rounded-full h-8 w-8 text-emerald-500"
                  onClick={() => {
                    if (inputValue.trim()) {
                      dispatch(
                        sendMessage({
                          prompt: inputValue,
                          jwt: auth.jwt || localStorage.getItem("jwt"),
                        })
                      );
                      setInputValue("");
                    }
                  }}
                >
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </div>
        )}
        <div
          onClick={handleBotRelease}
          className="relative cursor-pointer group"
        >
          <Button className="w-auto px-6 h-14 gap-3 items-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 btn-glow rounded-full">
            <MessageCircle
              className="fill-white stroke-none group-hover:scale-110 transition-transform duration-300"
              size={24}
            />
            <span className="text-lg font-semibold">AI Assistant</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

// Helper component for the arrow icon
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default Home;

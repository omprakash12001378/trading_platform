import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SearchIcon, TrendingUpIcon, StarIcon, XIcon, ClockIcon } from "lucide-react";
import { searchCoin, getTop50CoinList } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    // Load trending coins on mount
    dispatch(getTop50CoinList());
  }, []);

  // Debounced search
  useEffect(() => {
    if (keyword.trim()) {
      const timeoutId = setTimeout(() => {
        dispatch(searchCoin(keyword));
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [keyword, dispatch]);

  const handleCoinClick = (coin) => {
    // Save to recent searches
    const newRecent = [
      { id: coin.id, name: coin.name, symbol: coin.symbol, image: coin.large || coin.image },
      ...recentSearches.filter(item => item.id !== coin.id)
    ].slice(0, 5);

    setRecentSearches(newRecent);
    localStorage.setItem("recentSearches", JSON.stringify(newRecent));
    navigate(`/market/${coin.id}`);
  };

  const clearSearch = () => {
    setKeyword("");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const trendingCoins = coin.top50?.slice(0, 6) || [];
  const searchResults = coin.searchCoinList || [];
  const showResults = keyword.trim() && searchResults.length > 0;
  const showEmpty = keyword.trim() && searchResults.length === 0 && !coin.loading;

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Search Cryptocurrencies</span>
        </h1>
        <p className="text-gray-400">Discover and explore thousands of digital assets</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            className="pl-12 pr-12 h-14 text-lg border-emerald-500/20 focus:border-emerald-500/50 bg-card/50 backdrop-blur-sm rounded-full shadow-lg"
            placeholder="Search by name or symbol (e.g., Bitcoin, BTC)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-500/10 transition-colors"
            >
              <XIcon className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {coin.loading && keyword && (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-emerald-200/20 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Search Results */}
      {showResults && !coin.loading && (
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-emerald-500" />
            Search Results ({searchResults.length})
          </h2>
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCoinClick(item)}
                  className="p-4 rounded-xl border border-emerald-500/10 bg-card/50 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                      <AvatarImage src={item.large || item.image} alt={item.symbol} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
                    </div>
                    {item.market_cap_rank && (
                      <Badge variant="outline" className="border-emerald-500/30">
                        #{item.market_cap_rank}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Empty State */}
      {showEmpty && (
        <div className="glass-effect rounded-2xl p-12 border border-emerald-500/10 text-center">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No results found</h3>
          <p className="text-gray-400">Try searching with a different keyword</p>
        </div>
      )}

      {/* Recent Searches */}
      {!keyword && recentSearches.length > 0 && (
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-emerald-500" />
              Recent Searches
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearRecentSearches}
              className="text-gray-400 hover:text-gray-300"
            >
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSearches.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/market/${item.id}`)}
                className="p-4 rounded-xl border border-emerald-500/10 bg-card/50 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Coins */}
      {!keyword && (
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
            Trending Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingCoins.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCoinClick(item)}
                className="p-5 rounded-xl border border-emerald-500/10 bg-card/50 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="h-12 w-12 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30">
                    #{index + 1}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${item.current_price?.toLocaleString()}</span>
                  <span className={`text-sm font-semibold ${item.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                    {item.price_change_percentage_24h > 0 ? '+' : ''}
                    {item.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCoin;

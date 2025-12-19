import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MarketTicker = ({ coins }) => {
    if (!coins || coins.length === 0) return null;

    return (
        <div className="w-full bg-card/50 backdrop-blur-sm border-b border-emerald-500/10 overflow-hidden py-2">
            <div className="flex animate-scroll whitespace-nowrap">
                {/* Duplicate the list to create a seamless loop */}
                {[...coins, ...coins].map((coin, index) => (
                    <div
                        key={`${coin.id}-${index}`}
                        className="inline-flex items-center gap-2 mx-6 text-sm font-medium"
                    >
                        <span className="text-gray-400 uppercase">{coin.symbol}</span>
                        <span className="font-bold text-foreground">
                            ${coin.current_price?.toLocaleString()}
                        </span>
                        <span
                            className={`flex items-center text-xs ${coin.price_change_percentage_24h >= 0
                                    ? "text-emerald-400"
                                    : "text-rose-400"
                                }`}
                        >
                            {coin.price_change_percentage_24h >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketTicker;

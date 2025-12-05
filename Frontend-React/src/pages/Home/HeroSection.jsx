import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Wallet } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ auth, topGainer, topLoser }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Welcome Card */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 p-8 shadow-lg shadow-emerald-500/10">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BarChart3 size={120} className="text-emerald-500" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{auth.user?.fullName || "Trader"}</span>! 👋
                    </h1>
                    <p className="text-gray-400 mb-6 max-w-md">
                        The market is moving. Check out the latest trends and manage your portfolio with our AI-powered insights.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => navigate("/portfolio")}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20 rounded-full px-6"
                        >
                            View Portfolio <Wallet className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => navigate("/market")}
                            variant="outline"
                            className="border-emerald-500/30 hover:bg-emerald-500/10 rounded-full px-6"
                        >
                            Market Analysis <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Top Gainer Card */}
            <div className="rounded-2xl glass-effect border border-emerald-500/10 p-6 flex flex-col justify-between card-hover group">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Top Gainer (24h)</p>
                        <h3 className="text-xl font-bold">{topGainer?.name}</h3>
                        <p className="text-xs text-gray-500 uppercase">{topGainer?.symbol}</p>
                    </div>
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/50 transition-all">
                        <AvatarImage src={topGainer?.image} />
                    </Avatar>
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold text-emerald-400 flex items-center">
                        +{topGainer?.price_change_percentage_24h?.toFixed(2)}%
                        <TrendingUp className="ml-2 h-5 w-5" />
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Current Price: <span className="text-foreground">${topGainer?.current_price?.toLocaleString()}</span>
                    </p>
                </div>
            </div>

            {/* Top Loser Card */}
            <div className="rounded-2xl glass-effect border border-emerald-500/10 p-6 flex flex-col justify-between card-hover group">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Top Loser (24h)</p>
                        <h3 className="text-xl font-bold">{topLoser?.name}</h3>
                        <p className="text-xs text-gray-500 uppercase">{topLoser?.symbol}</p>
                    </div>
                    <Avatar className="h-10 w-10 ring-2 ring-rose-500/20 group-hover:ring-rose-500/50 transition-all">
                        <AvatarImage src={topLoser?.image} />
                    </Avatar>
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold text-rose-400 flex items-center">
                        {topLoser?.price_change_percentage_24h?.toFixed(2)}%
                        <TrendingUp className="ml-2 h-5 w-5 rotate-180" />
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Current Price: <span className="text-foreground">${topLoser?.current_price?.toLocaleString()}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

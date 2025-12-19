/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import StockChart from "./StockChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinById, fetchCoinDetails } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getAssetDetails } from "@/Redux/Assets/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, watchlist, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id));
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <>
      {coin.loading ? (
        "loading..."
      ) : (
        <div className="p-6 lg:p-10 mt-6 fade-in">
          <div className="glass-effect rounded-2xl p-6 lg:p-8 mb-8 card-hover">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex gap-6 items-center">
                <div>
                  <Avatar className="h-20 w-20 ring-4 ring-emerald-500/30">
                    <AvatarImage src={coin.coinDetails?.image?.large} />
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-2xl font-bold">{coin.coinDetails?.symbol?.toUpperCase()}</p>
                    <DotIcon className="text-gray-400 h-6 w-6" />
                    <p className="text-xl text-gray-400">{coin.coinDetails?.name}</p>
                  </div>
                  <div className="flex items-end gap-4">
                    <p className="text-4xl font-bold gradient-text">
                      ${coin.coinDetails?.market_data.current_price.usd?.toLocaleString()}
                    </p>
                    <p
                      className={`text-xl font-semibold ${coin.coinDetails?.market_data.market_cap_change_24h < 0
                          ? "status-negative"
                          : "status-positive"
                        }`}
                    >
                      <span>
                        {coin.coinDetails?.market_data.market_cap_change_24h > 0 ? "+" : ""}
                        ${coin.coinDetails?.market_data.market_cap_change_24h?.toFixed(2)}
                      </span>
                      <span className="ml-2">
                        ({coin.coinDetails?.market_data.market_cap_change_percentage_24h?.toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleAddToWatchlist}
                  className="h-12 w-12 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all duration-300"
                  variant="outline"
                  size="icon"
                >
                  {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                    <BookmarkFilledIcon className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </Button>

                <Dialog>
                  <DialogTrigger>
                    <Button
                      size="lg"
                      className="px-8 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 btn-glow text-lg font-semibold"
                    >
                      TRADE NOW
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-effect border-emerald-500/20">
                    <DialogHeader>
                      <DialogTitle className="px-10 pt-5 text-center text-2xl gradient-text">
                        How much do you want to trade?
                      </DialogTitle>
                    </DialogHeader>
                    <TreadingForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="chart-container card-hover">
            <StockChart coinId={coin.coinDetails?.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default StockDetails;


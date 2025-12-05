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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset, order } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    <div className="glass-effect rounded-2xl p-6 card-hover border border-emerald-500/10">
      <Table className="relative">
        <TableHeader>
          <TableRow className="border-b border-emerald-500/20 hover:bg-transparent">
            <TableHead className="py-5 font-semibold text-emerald-400">Date & Time</TableHead>
            <TableHead className="font-semibold text-emerald-400">Trading Pair</TableHead>
            <TableHead className="font-semibold text-emerald-400">Buy Price</TableHead>
            <TableHead className="font-semibold text-emerald-400">Sell Price</TableHead>
            <TableHead className="font-semibold text-emerald-400">Order Type</TableHead>
            <TableHead className="font-semibold text-emerald-400">Profit/Loss</TableHead>
            <TableHead className="text-right font-semibold text-emerald-400">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.orders?.map((item) => (
            <TableRow
              key={item.id}
              className="border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-all duration-200"
            >
              <TableCell>
                <p className="font-medium">{readableDate(item.timestamp).date}</p>
                <p className="text-xs text-gray-500">
                  {readableDate(item.timestamp).time}
                </p>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 ring-1 ring-emerald-500/20">
                    <AvatarImage
                      src={item.orderItem.coin.image}
                      alt={item.orderItem.coin.symbol}
                    />
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span>
                </div>
              </TableCell>

              <TableCell>${item.orderItem.buyPrice?.toLocaleString()}</TableCell>
              <TableCell>{item.orderItem.sellPrice ? "$" + item.orderItem.sellPrice?.toLocaleString() : "-"}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.orderType === "BUY"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                  }`}>
                  {item.orderType}
                </span>
              </TableCell>
              <TableCell
                className={`font-semibold ${calculateProfite(item) < 0 ? "text-rose-500" : "text-emerald-500"
                  }`}
              >
                {item.orderType == "SELL" ? "$" + calculateProfite(item)?.toLocaleString() : "-"}
              </TableCell>
              <TableCell className="text-right font-bold">
                ${item.price?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreadingHistory;


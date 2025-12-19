import { logout } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  HandIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, SettingsIcon, WalletIcon } from "lucide-react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },

  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },

  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },

  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
];
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = (item) => {
    if (item.name == "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mt-8 space-y-3 px-2">
      {menu.map((item) => (
        <div key={item.name}>
          <SheetClose className="w-full">
            <Button
              onClick={() => handleMenuClick(item)}
              variant="ghost"
              className={`flex items-center justify-start gap-4 py-6 w-full rounded-xl transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 group ${item.name === "Logout"
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                : ""
                }`}
            >
              <span className={`w-8 transition-transform duration-300 group-hover:scale-110 ${item.name === "Logout" ? "" : "group-hover:text-emerald-400"
                }`}>
                {item.icon}
              </span>
              <p className="text-base font-medium">{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default SideBar;


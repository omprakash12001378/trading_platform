import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN" ? navigate("/admin/withdrawal") : navigate("/profile")
    }
  }
  return (
    <>
      <div className="navbar-blur px-4 lg:px-6 py-4 z-50 sticky top-0 left-0 right-0 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4 lg:gap-6">
          <Sheet className="">
            <SheetTrigger asChild>
              <Button
                className="rounded-full h-11 w-11 hover:bg-emerald-500/10 transition-all duration-300 btn-glow"
                variant="ghost"
                size="icon"
              >
                <DragHandleHorizontalIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-80 border-r border-emerald-500/20 glass-effect"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="text-3xl flex justify-center items-center gap-2 py-4">
                    <Avatar className="h-12 w-12 ring-2 ring-emerald-500/30">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                    </Avatar>
                    <div className="flex items-center">
                      <span className="font-bold gradient-text">Coin</span>
                      <span className="font-semibold text-foreground">Trade</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Avatar className="h-9 w-9 ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/60 transition-all duration-300">
              <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
            </Avatar>
            <p className="text-base lg:text-lg font-semibold hidden sm:block">
              <span className="gradient-text">Coin</span>
              <span className="text-foreground">Trade</span>
            </p>
          </div>

          <div className="ml-4 lg:ml-8">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-2 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 btn-glow"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Avatar
            className="cursor-pointer h-10 w-10 ring-2 ring-emerald-500/30 hover:ring-emerald-500/60 transition-all duration-300 card-hover"
            onClick={handleNavigate}
          >
            {!auth.user ? (
              <AvatarIcon className="h-6 w-6" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                {auth.user?.fullName[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;


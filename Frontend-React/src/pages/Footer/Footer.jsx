import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send, Bitcoin, Globe, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-emerald-500/20 bg-background/50 backdrop-blur-xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/20 pointer-events-none" />

            <div className="relative mx-auto max-w-[1600px] px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10 ring-2 ring-emerald-500/30">
                                <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                            </Avatar>
                            <div className="flex items-center text-2xl">
                                <span className="font-bold gradient-text">Coin</span>
                                <span className="font-semibold text-foreground">Trade</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Experience the future of digital asset trading with our professional-grade platform.
                            Secure, fast, and reliable.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/20 bg-card/50 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20"
                                >
                                    <Icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-emerald-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-emerald-500">
                            Platform
                        </h3>
                        <ul className="space-y-4">
                            {["Market Analysis", "Live Trading", "Portfolio", "Watchlist", "News"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 transition-colors hover:text-emerald-400 hover:pl-2 flex items-center gap-2"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 opacity-0 transition-opacity hover:opacity-100" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-emerald-500">
                            Support
                        </h3>
                        <ul className="space-y-4">
                            {["Help Center", "API Documentation", "Fees & Charges", "Security", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 transition-colors hover:text-emerald-400 hover:pl-2"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-gray-400">
                            Subscribe to our newsletter for the latest market updates and exclusive features.
                        </p>
                        <div className="relative">
                            <Input
                                placeholder="Enter your email"
                                className="h-11 rounded-xl border-emerald-500/20 bg-card/50 pr-12 focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                            <Button
                                size="icon"
                                className="absolute right-1 top-1 h-9 w-9 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                            >
                                <Send className="h-4 w-4 text-white" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <span>Secure SSL</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Globe className="h-4 w-4 text-emerald-500" />
                                <span>Global Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-emerald-500/10 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-gray-500">
                            © 2025 CoinTrade Platform. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <a href="#" className="text-xs text-gray-500 hover:text-emerald-400">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-gray-500 hover:text-emerald-400">
                                Terms of Service
                            </a>
                            <a href="#" className="text-xs text-gray-500 hover:text-emerald-400">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

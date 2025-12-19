import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinList, searchCoin } from "@/Redux/Coin/Action";
import { AssetTable } from "../Home/AssetTable";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom table for search results with limited data
const SearchResultsTable = ({ coins }) => {
    const navigate = useNavigate();

    return (
        <Table className="relative">
            <ScrollArea className="h-[74vh]">
                <TableHeader>
                    <TableRow className="sticky top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-emerald-500/20 hover:bg-card/95">
                        <TableHead className="py-5 font-semibold text-emerald-400">COIN</TableHead>
                        <TableHead className="font-semibold text-emerald-400">SYMBOL</TableHead>
                        <TableHead className="text-right font-semibold text-emerald-400">ACTION</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {coins.map((item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-all duration-200 group"
                        >
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-200">
                                        <AvatarImage src={item.image || `https://via.placeholder.com/40?text=${item.symbol}`} alt={item.symbol} />
                                    </Avatar>
                                    <span className="font-semibold group-hover:text-emerald-400 transition-colors">{item.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-gray-400 uppercase">{item.symbol}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    onClick={() => navigate(`/market/${item.id}`)}
                                    size="sm"
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20"
                                >
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ScrollArea>
        </Table>
    );
};

const Market = () => {
    const dispatch = useDispatch();
    const { coin } = useSelector((store) => store);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCoinList(currentPage));
    }, [currentPage]);

    // Debounced search effect
    useEffect(() => {
        if (searchQuery.trim()) {
            const timeoutId = setTimeout(() => {
                dispatch(searchCoin(searchQuery));
            }, 500); // 500ms debounce
            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery, dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Determine which data to display
    const isSearching = searchQuery.trim();
    const displayCoins = isSearching ? coin.searchCoinList : coin.coinList;

    return (
        <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">Market Overview</span>
                    </h1>
                    <p className="text-gray-400">
                        {isSearching
                            ? `Search results for "${searchQuery}"`
                            : "Explore cryptocurrencies by market cap"}
                    </p>
                </div>
                <div className="relative w-full md:w-[300px]">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search coins globally..."
                        className="pl-10 h-12 border-emerald-500/20 focus:border-emerald-500/50 bg-card/50 backdrop-blur-sm rounded-full"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 card-hover border border-emerald-500/10 mb-6">
                {coin.loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-emerald-200/20 rounded-full animate-spin"></div>
                    </div>
                ) : displayCoins && displayCoins.length > 0 ? (
                    isSearching ? (
                        <SearchResultsTable coins={displayCoins} />
                    ) : (
                        <AssetTable coins={displayCoins} category="all" />
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <MagnifyingGlassIcon className="h-16 w-16 mb-4 opacity-50" />
                        <p className="text-lg">No coins found</p>
                        {isSearching && (
                            <p className="text-sm mt-2">Try a different search term</p>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls - Only show when not searching */}
            {!isSearching && (
                <div className="flex justify-center">
                    <Pagination>
                        <PaginationContent className="glass-effect border border-emerald-500/20 rounded-full px-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    className={`cursor-pointer hover:bg-emerald-500/10 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            </PaginationItem>

                            {[...Array(10)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                            className={`cursor-pointer rounded-full ${currentPage === page
                                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                    : 'hover:bg-emerald-500/10'
                                                }`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="cursor-pointer hover:bg-emerald-500/10 rounded-full"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default Market;

import { Button } from "@/components/ui/button";
import { ArrowLeft, Ban, Bitcoin, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Animated Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
          <div className="relative bg-card/50 backdrop-blur-xl border border-emerald-500/20 p-8 rounded-full shadow-2xl float-animation">
            <SearchX className="w-20 h-20 text-emerald-500" />
            <div className="absolute -top-2 -right-2">
              <Bitcoin className="w-10 h-10 text-yellow-500 animate-bounce delay-700" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Ban className="w-8 h-8 text-rose-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black gradient-text tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold">
            Lost in the Blockchain?
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            The block you are looking for hasn't been mined yet or might have been moved to a cold wallet.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="group relative px-8 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 btn-glow rounded-full font-semibold overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Exchange
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="px-8 h-12 rounded-full border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;

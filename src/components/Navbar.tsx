import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-primary text-white py-3 px-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl">Sarvadhi</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search here..."
            className="w-full bg-white/10 border border-white/20 pl-10 text-white placeholder:text-white/60 focus-visible:ring-1 focus-visible:ring-white/30"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
        </div>
        <div className="border-b-2 border-gray-300 pb-1 hidden md:block">
          <span>{isHomePage ? "Product List" : "View Product"}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

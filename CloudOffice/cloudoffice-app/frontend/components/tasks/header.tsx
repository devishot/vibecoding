import { Button } from "@/components/ui/button";
import { Filter, Plus, X } from "lucide-react";

function Header({ showFilters, setShowFilters }: { showFilters: boolean; setShowFilters: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="hidden md:flex">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {showFilters && <X className="ml-2 h-4 w-4" />}
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
    </div>
  );
}

export default Header; 
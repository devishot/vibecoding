import { Card } from "@/components/ui/card";
import { TaskFilters } from "./task-filters";

function FilterSection({ showFilters }: { showFilters: boolean }) {
  return (
    <div className={`${showFilters ? "block" : "hidden"} md:block md:w-[250px]`}>
      <Card className="p-4">
        <TaskFilters />
      </Card>
    </div>
  );
}

export default FilterSection; 
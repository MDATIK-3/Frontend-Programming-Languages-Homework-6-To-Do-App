import { TaskFilters } from "../types";

interface FilterSectionProps {
  taskFilters: TaskFilters;
  onTaskFiltersChange: <Key extends keyof TaskFilters>(key: Key, value: TaskFilters[Key]) => void;
}

export function FilterSection({ taskFilters, onTaskFiltersChange }: FilterSectionProps) {
  return (
    <fieldset className="mb-3 rounded-none border border-slate-500 px-2.5 pb-2.5 pt-2">
      <legend className="px-1">Filter</legend>
      <div className="mb-1.5 flex items-center gap-1.5">
        <input
          className="h-4 w-4 accent-slate-700"
          checked={taskFilters.showCompleted}
          id="showCompleted"
          type="checkbox"
          onChange={(event) => onTaskFiltersChange("showCompleted", event.target.checked)}
        />
        <label htmlFor="showCompleted">Show completed</label>
        <input
          className="border border-slate-400 px-1 py-0.5 outline-none focus:border-slate-600"
          id="filterFrom"
          title="Date From"
          type="date"
          value={taskFilters.from}
          onChange={(event) => onTaskFiltersChange("from", event.target.value)}
        />
        <input
          className="border border-slate-400 px-1 py-0.5 outline-none focus:border-slate-600"
          id="filterTo"
          title="Date To"
          type="date"
          value={taskFilters.to}
          onChange={(event) => onTaskFiltersChange("to", event.target.value)}
        />
      </div>
      <input
        className="w-full border border-slate-400 px-1.5 py-1 outline-none focus:border-slate-600"
        id="filterText"
        placeholder="Text search (title + description)"
        type="text"
        value={taskFilters.text}
        onChange={(event) => onTaskFiltersChange("text", event.target.value)}
      />
    </fieldset>
  );
}

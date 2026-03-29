import { formatDate } from "../taskUtils";
import { SortKey, SortState, Task } from "../types";

const emptyTasksText = "No tasks.";
const emptyValue = "\u2014";
const inactiveSortIcon = "\u21C5";
const sortAscIcon = "\u25B2";
const sortDescIcon = "\u25BC";

interface TaskTableProps {
  sortState: SortState;
  tasks: Task[];
  onSort: (sortKey: SortKey) => void;
  onToggleDone: (taskId: string) => void;
}

export function TaskTable({ sortState, tasks, onSort, onToggleDone }: TaskTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th
            className="cursor-pointer select-none border border-slate-400 bg-slate-300 px-2 py-1 text-left font-semibold hover:bg-slate-400"
            onClick={() => onSort("done")}
          >
            Done
            <span className="ml-1 inline-block" id="si-done">
              {getSortIcon("done", sortState)}
            </span>
          </th>
          <th
            className="cursor-pointer select-none border border-slate-400 bg-slate-300 px-2 py-1 text-left font-semibold hover:bg-slate-400"
            onClick={() => onSort("title")}
          >
            Title
            <span className="ml-1 inline-block" id="si-title">
              {getSortIcon("title", sortState)}
            </span>
          </th>
          <th
            className="cursor-pointer select-none border border-slate-400 bg-slate-300 px-2 py-1 text-left font-semibold hover:bg-slate-400"
            onClick={() => onSort("priority")}
          >
            Priority
            <span className="ml-1 inline-block" id="si-priority">
              {getSortIcon("priority", sortState)}
            </span>
          </th>
          <th
            className="cursor-pointer select-none border border-slate-400 bg-slate-300 px-2 py-1 text-left font-semibold hover:bg-slate-400"
            onClick={() => onSort("date")}
          >
            Date
            <span className="ml-1 inline-block" id="si-date">
              {getSortIcon("date", sortState)}
            </span>
          </th>
        </tr>
      </thead>
      <tbody id="taskBody">
        {tasks.length === 0 ? (
          <tr>
            <td className="border border-slate-400 px-2 py-1 text-center text-slate-500" colSpan={4}>
              {emptyTasksText}
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id} className="odd:bg-white even:bg-slate-100 hover:bg-blue-100">
              <td className="border border-slate-400 px-2 py-1 text-center">
                <input
                  checked={task.done}
                  className="h-4 w-4 accent-slate-700"
                  type="checkbox"
                  onChange={() => onToggleDone(task.id)}
                />
              </td>
              <td className="border border-slate-400 px-2 py-1" title={task.description}>
                {task.title}
              </td>
              <td className="border border-slate-400 px-2 py-1">{task.priority || emptyValue}</td>
              <td className="border border-slate-400 px-2 py-1">{task.date ? formatDate(task.date) : emptyValue}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

function getSortIcon(sortKey: SortKey, sortState: SortState): string {
  if (sortState.key !== sortKey) {
    return inactiveSortIcon;
  }

  return sortState.dir === 1 ? sortAscIcon : sortDescIcon;
}

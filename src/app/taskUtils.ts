import { SortKey, SortState, Task, TaskFilters } from "./types";

const priorityRank = {
  High: 1,
  Medium: 2,
  Low: 3,
  "": 4
} as const;

export function formatDate(isoDate: string): string {
  if (!isoDate) {
    return "";
  }

  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function createTaskId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getVisibleTasks(tasks: Task[], filters: TaskFilters, sort: SortState): Task[] {
  return [...tasks]
    .filter((task) => {
      if (!filters.showCompleted && task.done) {
        return false;
      }

      if (filters.text) {
        const searchText = filters.text.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchText);
        const descriptionMatch = task.description.toLowerCase().includes(searchText);

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      if (filters.from && task.date && task.date < filters.from) {
        return false;
      }

      if (filters.to && task.date && task.date > filters.to) {
        return false;
      }

      return true;
    })
    .sort((left, right) => compareTasks(left, right, sort.key, sort.dir));
}

export function getNextSortState(sort: SortState, nextKey: SortKey): SortState {
  if (sort.key === nextKey) {
    return {
      key: nextKey,
      dir: (sort.dir * -1) as 1 | -1
    };
  }

  return {
    key: nextKey,
    dir: 1
  };
}

function compareTasks(left: Task, right: Task, sortKey: SortKey, sortDir: 1 | -1): number {
  let leftValue: string | number = "";
  let rightValue: string | number = "";

  if (sortKey === "title") {
    leftValue = left.title.toLowerCase();
    rightValue = right.title.toLowerCase();
  }

  if (sortKey === "priority") {
    leftValue = priorityRank[left.priority];
    rightValue = priorityRank[right.priority];
  }

  if (sortKey === "date") {
    leftValue = left.date || "";
    rightValue = right.date || "";
  }

  if (sortKey === "done") {
    leftValue = left.done ? 1 : 0;
    rightValue = right.done ? 1 : 0;
  }

  if (leftValue < rightValue) {
    return -1 * sortDir;
  }

  if (leftValue > rightValue) {
    return 1 * sortDir;
  }

  return 0;
}

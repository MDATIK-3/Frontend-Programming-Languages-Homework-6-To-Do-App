export type Priority = "High" | "Medium" | "Low" | "";
export type SortKey = "done" | "title" | "priority" | "date";
export type SortDir = 1 | -1;

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: Priority;
  done: boolean;
}

export interface TaskDraft {
  title: string;
  description: string;
  date: string;
  priority: Priority;
}

export interface TaskFilters {
  showCompleted: boolean;
  text: string;
  from: string;
  to: string;
}

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

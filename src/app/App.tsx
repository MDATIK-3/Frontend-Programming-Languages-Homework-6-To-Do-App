import { FormEvent, useRef, useState } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterSection} from "./components/FilterSection";
import { TaskTable } from "./components/TaskTable";
import { getNextSortState, getVisibleTasks, createTaskId } from "./taskUtils";
import { SortKey, SortState, Task, TaskDraft, TaskFilters } from "./types";

const defaultTaskDraft: TaskDraft = {
  title: "",
  description: "",
  date: "",
  priority: ""
};

const defaultTaskFilters: TaskFilters = {
  showCompleted: false,
  text: "",
  from: "",
  to: ""
};

const defaultSortState: SortState = {
  key: "date" as const,
  dir: 1 as const
};

export function App() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDraft, setTaskDraft] = useState<TaskDraft>(defaultTaskDraft);
  const [taskFilters, setTaskFilters] = useState<TaskFilters>(defaultTaskFilters);
  const [sortState, setSortState] = useState<SortState>(defaultSortState);
  const [errorMessage, setErrorMessage] = useState("");

  const visibleTasks = getVisibleTasks(tasks, taskFilters, sortState);

  function handleTaskSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const title = taskDraft.title.trim();

    if (!title) {
      setErrorMessage("Title is required.");
      titleInputRef.current?.focus();
      return;
    }

    const nextTask: Task = {
      id: createTaskId(),
      title,
      description: taskDraft.description.trim(),
      date: taskDraft.date,
      priority: taskDraft.priority,
      done: false
    };

    setTasks((currentTasks) => [nextTask, ...currentTasks]);
    setTaskDraft((currentDraft) => ({
      ...defaultTaskDraft,
      date: currentDraft.date
    }));
    setErrorMessage("");
    titleInputRef.current?.focus();
  }

  function handleToggleDone(taskId: string): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  }

  function handleSort(nextSortKey: SortKey): void {
    setSortState((currentSortState) => getNextSortState(currentSortState, nextSortKey));
  }

  function updateTaskDraft<Key extends keyof TaskDraft>(key: Key, value: TaskDraft[Key]): void {
    setTaskDraft((currentDraft) => ({
      ...currentDraft,
      [key]: value
    }));

    if (key === "title" && errorMessage) {
      setErrorMessage("");
    }
  }

  function updateTaskFilters<Key extends keyof TaskFilters>(key: Key, value: TaskFilters[Key]): void {
    setTaskFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value
    }));
  }

  return (
    <main className="min-h-screen bg-white p-4 text-[13px] text-slate-900 [font-family:Arial,sans-serif]">
      <AddTaskForm
        errorMessage={errorMessage}
        taskDraft={taskDraft}
        titleInputRef={titleInputRef}
        onSubmit={handleTaskSubmit}
        onTaskDraftChange={updateTaskDraft}
      />
      <FilterSection taskFilters={taskFilters} onTaskFiltersChange={updateTaskFilters} />
      <TaskTable
        sortState={sortState}
        tasks={visibleTasks}
        onSort={handleSort}
        onToggleDone={handleToggleDone}
      />
    </main>
  );
}

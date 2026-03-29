import { FormEvent, RefObject } from "react";
import { Priority, TaskDraft } from "../types";

interface AddTaskFormProps {
  errorMessage: string;
  taskDraft: TaskDraft;
  titleInputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTaskDraftChange: <Key extends keyof TaskDraft>(key: Key, value: TaskDraft[Key]) => void;
}

export function AddTaskForm({
  errorMessage,
  taskDraft,
  titleInputRef,
  onSubmit,
  onTaskDraftChange
}: AddTaskFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset className="mb-3 rounded-none border border-slate-500 px-2.5 pb-2.5 pt-2">
        <legend className="px-1">Add Task</legend>
        <div className="mb-1 flex flex-col gap-1 sm:flex-row">
          <input
            ref={titleInputRef}
            className="w-full border border-slate-400 px-1.5 py-1 outline-none focus:border-slate-600 sm:flex-[2]"
            id="inTitle"
            placeholder="Title"
            type="text"
            value={taskDraft.title}
            onChange={(event) => onTaskDraftChange("title", event.target.value)}
          />
          <select
            className="w-full border border-slate-400 px-1 py-1 outline-none focus:border-slate-600 sm:flex-1"
            id="inPriority"
            value={taskDraft.priority}
            onChange={(event) => onTaskDraftChange("priority", event.target.value as Priority)}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            className="w-full border border-slate-400 px-1 py-1 outline-none focus:border-slate-600 sm:flex-1"
            id="inDate"
            type="date"
            value={taskDraft.date}
            onChange={(event) => onTaskDraftChange("date", event.target.value)}
          />
        </div>
        <textarea
          className="mb-1 h-14 w-full resize-y border border-slate-400 px-1.5 py-1 outline-none focus:border-slate-600"
          id="inDesc"
          placeholder="Description"
          value={taskDraft.description}
          onChange={(event) => onTaskDraftChange("description", event.target.value)}
        />
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end">
          <span className="min-h-[1rem] text-red-600" id="addError">
            {errorMessage}
          </span>
          <button
            className="w-full border border-slate-400 bg-slate-100 px-3.5 py-1 transition hover:bg-slate-200 sm:w-auto"
            type="submit"
          >
            Add
          </button>
        </div>
      </fieldset>
    </form>
  );
}

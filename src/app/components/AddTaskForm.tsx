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
        <div className="mb-1 flex gap-1">
          <input
            ref={titleInputRef}
            className="flex-[2] border border-slate-400 px-1.5 py-1 outline-none focus:border-slate-600"
            id="inTitle"
            placeholder="Title"
            type="text"
            value={taskDraft.title}
            onChange={(event) => onTaskDraftChange("title", event.target.value)}
          />
          <select
            className="flex-1 border border-slate-400 px-1 py-1 outline-none focus:border-slate-600"
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
            className="flex-1 border border-slate-400 px-1 py-1 outline-none focus:border-slate-600"
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
        <div className="flex items-center justify-end gap-2">
          <span className="text-red-600" id="addError">
            {errorMessage}
          </span>
          <button
            className="border border-slate-400 bg-slate-100 px-3.5 py-1 transition hover:bg-slate-200"
            type="submit"
          >
            Add
          </button>
        </div>
      </fieldset>
    </form>
  );
}

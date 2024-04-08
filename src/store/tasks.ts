import { makeAutoObservable } from "mobx";
import axios from "../axios";
import { logError } from "../scripts/errorLog";
import { transformDateToString } from "../scripts/transformDateToString";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";

export type ITask = {
  text: string;
  isImportant: boolean;
  id: string;
};

// type TasksType = { text: string; isImportant: boolean; id: string };
// Record<string, TasksType[]>;
type TasksType = {
  [key in string]: ITask[];
};

class Tasks {
  tasksFromDB: TasksType;

  constructor() {
    this.tasksFromDB = {};

    makeAutoObservable(this);
  }

  async setTasksfromDB() {
    try {
      const { data }: { data: TasksType } = await axios.get("/tasks/all");

      this.tasksFromDB = data;
    } catch (error) {
      logError(error);
    }
  }

  getTasksOnDay(date: Date | "other"): ITask[] {
    const dateKey = transformDateToString(date);

    if (Object.keys(this.tasksFromDB).length !== 0) {
      return this.tasksFromDB[dateKey] || [];
    }
    return getStorageTasksList(date);
  }

  setTasksOnDay(date: Date | "other", task: ITask[]) {
    const dateKey = transformDateToString(date);
    this.tasksFromDB[dateKey] = task;
  }
}

export const TasksStore = new Tasks();

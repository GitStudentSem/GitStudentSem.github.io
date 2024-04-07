import { makeAutoObservable } from "mobx";
import axios from "../axios";
import { logError } from "../scripts/errorLog";

export type ITask = {
  text: string;
  isImportant: boolean;
  id: string;
};

export type TasksFromDBType = {
  dateKey: Date | "other";
  tasks: ITask[];
};

class Tasks {
  tasksFromDB: TasksFromDBType[];

  constructor() {
    this.tasksFromDB = [];

    makeAutoObservable(this);
  }

  async setTasksfromDB() {
    try {
      const { data } = await axios.get("/tasks/all");
      const selectedFields: TasksFromDBType[] = [];
      for (const dateKey in data) {
        selectedFields.push({
          dateKey: dateKey !== "other" ? new Date(dateKey) : "other",
          tasks: data[dateKey],
        });
      }
      this.tasksFromDB = selectedFields;
    } catch (error) {
      logError(error);
    }
  }
}

export const TasksStore = new Tasks();

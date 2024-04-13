import { makeAutoObservable } from "mobx";
import { transformDateToString } from "../scripts/transformDateToString";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { UserStore } from "./user";
import { makeFetch } from "../scripts/makeFetch";

export type ITask = {
	text: string;
	isImportant: boolean;
	id: string;
};

// type TasksType = { text: string; isImportant: boolean; id: string };
// Record<string, TasksType[]>;
export type TasksType = {
	[key in string]: ITask[];
};

class Tasks {
	tasksFromDB: TasksType;

	constructor() {
		this.tasksFromDB = {};

		makeAutoObservable(this);
	}

	async setTasksfromDB() {
		makeFetch.get("/tasks/all").then((data: TasksType) => {
			this.tasksFromDB = data;
		});
	}

	getTasksOnDay(date: Date | "other"): ITask[] {
		const dateKey = transformDateToString(date);

		if (UserStore.isAuth) {
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

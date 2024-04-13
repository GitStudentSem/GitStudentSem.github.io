import styled from "styled-components";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { observer } from "mobx-react-lite";
import { UserStore } from "../store/user";
import { setStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { ITask, TasksStore } from "../store/tasks";
import { makeFetch } from "../scripts/makeFetch";

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 98%;
  transition: 0.3s;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const StyledTaskText = styled.p`
  flex-grow: 1;
  text-align: start;
  padding-right: 10px;
  overflow-x: hidden;
  margin-left: 5px;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
interface ITaskItemProps {
	date: Date | "other";
	taskItem: ITask;
	index: number;
}
const TaskItem = observer(({ taskItem, index, date }: ITaskItemProps) => {
	const changeIsImportant = async () => {
		if (UserStore.isAuth) {
			makeFetch
				.patch("/tasks/isImportant", {
					dateKey: transformDateToString(date),
					isImportant: !taskItem.isImportant,
					id: taskItem.id,
				})
				.then((data: ITask[]) => {
					TasksStore.setTasksOnDay(date, data);
				});
		} else {
			const copyTasks = [...TasksStore.getTasksOnDay(date)].map((task) => {
				return { ...task };
			});
			copyTasks[index].isImportant = !copyTasks[index].isImportant;
			TasksStore.setTasksOnDay(date, copyTasks);
			setStorageTasksList(copyTasks, date);
		}
	};

	const deleteTask = async () => {
		if (UserStore.isAuth) {
			makeFetch
				.patch("/tasks/delete", {
					dateKey: transformDateToString(date),
					id: taskItem.id,
				})
				.then((data: ITask[]) => {
					TasksStore.setTasksOnDay(date, data);
				});
		} else {
			const copyTasks = [
				...TasksStore.getTasksOnDay(date).map((task) => {
					return { ...task };
				}),
			];
			copyTasks.splice(index, 1);

			TasksStore.setTasksOnDay(date, copyTasks);
			setStorageTasksList(copyTasks, date);
		}
	};

	return (
		<StyledTask>
			<StyledButton
				onClick={(e) => {
					e.preventDefault();
					changeIsImportant();
				}}
			>
				<AiFillStar
					size={20}
					fill={
						taskItem.isImportant
							? "rgb(255, 255, 255)"
							: "rgba(255, 255, 255, 0.6)"
					}
				/>
			</StyledButton>

			<StyledTaskText>{taskItem.text}</StyledTaskText>

			<StyledButton
				onClick={() => {
					deleteTask();
				}}
			>
				<AiFillDelete size={20} fill="rgba(255, 255, 255, 0.8)" />
			</StyledButton>
		</StyledTask>
	);
});

export default TaskItem;

import axios from "axios";
import {TaskType, TodoType} from "./types/entityies";

type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string,
}
type ActiveTaskResponseType = {
    data: {item: TaskType}
    resultCode: number
    messages: string[],
}
type TodoResponseType = {
    data: { item: TodoType }
    resultCode: number
    messages: string[],
}
type TitleType = {
    title: string,
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "3eb442be-c6ec-48c8-96fc-69807a29300c"}// меняем API-KEY на собственный
});

export const api = {
    getTodolists() {
        return instance.get<TodoType[]>('').then(res=> res.data)
    },
    createTodolist(title: string) {
        return instance.post<TodoResponseType>("", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodoResponseType>(`/${todolistId}`)
    },
    updateTodolistTitle(title: string, todolistId: string) {
        return instance.put<TitleType>(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<ActiveTaskResponseType>(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId: string, todolistId: string, task: any) {
        return instance.put<ActiveTaskResponseType>(`/${todolistId}/tasks/${taskId}`, task);
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<TodoResponseType>(`/${todolistId}/tasks/${taskId}`)
    }
};





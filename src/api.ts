import axios from "axios";
import {TodoType} from "./types/entityies";

type GetTasksResponseType = {
    data: { item: TodoType }
    resultCode: number
    messages: string[],
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
        return instance.post("", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/${todolistId}`)
    },
    updateTodolistTitle(title: string, todolistId: string) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId: string, todolistId: string, task: any) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, task);
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    }
};





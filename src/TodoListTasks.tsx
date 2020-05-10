import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entityies";

type TDTasksType = {
    changeStatus: (taskId: string, status: number) => void,
    deleteTask: (taskId: string) => void,
    changeTitle: (title: string, todoId: string) => void,
    tasks: TaskType[],
}

class TodoListTasks extends React.Component<TDTasksType> {
    render = () => {

        let tasksElements = this.props.tasks.map(task => {
            return <TodoListTask task={task}
                                 key={task.id}
                                 changeStatus={this.props.changeStatus}
                                 changeTitle={this.props.changeTitle}
                                 deleteTask={this.props.deleteTask}
            />
        });

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;


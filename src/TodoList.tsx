import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTask,
    getTasks,
    changeTask,
    deleteTodo, deleteTask, updateTitle
} from "./reducer";
import {TaskType, TodoType} from "./types/entityies";

type StateType = {
    // filterValue: "All" | "Completed" | "Active"
    filterValue: string
}

type MDTPType = {
    getTasks: (todoId: string) => void, // input parameters (left) &&  output parameters (right)
    addTask: (newText: string, todoId: string) => void,
    changeTask: (taskId: string, todoId: string, task: TaskType, obj: any) => void,
    deleteTodo:(todoId: string) => void,
    deleteTask:(todoId: string, taskId: string) => void,
    updateTitle:(title: string, todoId: string) => void,
}

type TodolistType = TodoType & MDTPType;

// type X = number;
// type Y<T> = T extends number ? boolean : string;
// const y: Y<undefined> = 1

class TodoList extends React.Component <TodolistType, StateType> {

    state: StateType = {
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTasks(this.props.id)
    };

    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id)
    };

    changeFilter = (newFilterValue:string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId: string, obj: any) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        this.props.changeTask(taskId, this.props.id, task, obj);
    };

    changeStatus = (taskId:string, status:number) => {
        this.changeTask(taskId, {status});
    };

    changeTitle = (taskId:string, title:string) => {
        this.changeTask(taskId, {title});
    };

    deleteTodolist = () => {
        this.props.deleteTodo(this.props.id)
    };

    deleteTask = (taskId: string) => {
        this.props.deleteTask(taskId, this.props.id);
    };

    updateTitle = (title:string) => {
        this.props.updateTitle(title, this.props.id)
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
            <div className = "todoList-header">
            <div className = "wrapper" >
            <TodoListTitle title = {this.props.title} updateTitle = {this.updateTitle} />
        < button onClick = {this.deleteTodolist} > X </button>
            </div>
            <AddNewItemForm addItem = {this.addTask}/>
        </div>

        <TodoListTasks
        changeStatus = {this.changeStatus}
        changeTitle = {this.changeTitle}
        deleteTask = {this.deleteTask}
        tasks = {
            tasks.filter(t => {
                if (this.state.filterValue === "All") {
                    return true;
                }
                if (this.state.filterValue === "Active") {
                    return t.status === 0;
                }
                if (this.state.filterValue === "Completed") {
                    return t.status === 2;
                }
            })
        }
        />
        < TodoListFooter changeFilter = {this.changeFilter} filterValue = {this.state.filterValue} />
        </div>
    );
    }
}


export default connect<{}, MDTPType, {}, StateType>(null, {getTasks, addTask, changeTask, deleteTodo, deleteTask, updateTitle})(TodoList);


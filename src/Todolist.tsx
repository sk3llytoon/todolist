import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    CheckBoxChange: (currentID:string, checkedValue:boolean)=>void
    filter: string
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const addTask = () => {
        if(title.trim() !==''){
            props.addTask(title.trim());
            setTitle("");
        } else{
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const CheckBoxChangeHandler = (tID:string, checkedValue: boolean) =>{
        props.CheckBoxChange(tID, checkedValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? styles.error : ''}
                value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
        {error &&<div className={styles.errorMessage}>Title is required</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(e)=>CheckBoxChangeHandler(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter==='all' ? styles.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter==='active' ? styles.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter==='completed' ? styles.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}

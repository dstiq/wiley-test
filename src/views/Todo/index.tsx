import React from "react";
import styles from './index.module.css';
import clsx from 'clsx';
import {ReactComponent as LogoClose} from '../../resources/svg/close-button.svg';

type TTask = {
    key: string
    value: string
    isDone: boolean
}
type ITask = TTask[];

type TStorageKey = 'tasks';
const key: TStorageKey = 'tasks';

function Todo() {
    const [tasks, setTasks] = React.useState<ITask>([])
    const [taskValue, setTaskValue] = React.useState<string>('');

    const onChangeItem = (key: TTask['key']) => () => {
        setTasks(tasks.map((e: TTask) => {
            if (e.key === key) {
                return {...e, isDone: !e.isDone}
            }
            return e;
        }));
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setTaskValue(e.target.value);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (taskValue.length > 0) {
            setTasks([...tasks, {key: `${taskValue}${Date.now()}`, value: taskValue, isDone: false}]);
            setTaskValue('');
        }
    };
    const onLogoClick = (key: TTask['key']) => (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const next = tasks.filter((e: TTask) => key !== e.key);
        console.log(next);
        setTasks((state) => [...next])
    };

    /**
     * Сетим данные в сторадж перед уходом
     */
    React.useEffect(() => {
        const unload = () => {
            localStorage.setItem(key, JSON.stringify(tasks))
        };
        window.addEventListener('beforeunload', unload);
        return function () {
            window.removeEventListener('beforeunload', unload)
        }
    },[tasks]);
    /**
     * На этапе инициализации берем данные из стораджа и кладем в состояние
     */
    React.useEffect(() => {
        const string = localStorage.getItem(key);
        if (string !== null) {
            const items = JSON.parse(string);
            setTasks(items)
        }
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>
                    Добавь задачу
                </span>
                <div className={styles.createTask}>
                    <input value={taskValue} onChange={onChange}/>
                    <button onClick={onClick}>добавить</button>
                </div>
            </div>

            <div className={styles.list}>
                <ul>
                    {tasks.map((e) => {
                        const className = clsx(styles.item, {
                            [styles.completed]: !!e.isDone
                        });
                        return <li key={e.key} onClick={onChangeItem(e.key)} className={className}>
                            {e.value}
                            <LogoClose onClick={onLogoClick(e.key)} className={styles.logo}/>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
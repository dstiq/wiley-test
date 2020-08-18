import React, {ChangeEventHandler} from 'react';
import logo from './logo.svg';
import './App.css';

type TTask = {
    key: string
    isDone: boolean
}
type ITask = TTask[];
//setTasks([...tasks, {key: e.target.value, isDone: false}])
function App() {
    const [tasks, setTasks] = React.useState<ITask>([])
    const [input, setInput] = React.useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
    const onClick = (e: ) => setTasks([...tasks, {key: e.target.value, isDone: false}])
    return (
        <div className="container">
            <span className="title"></span>
            <div className="create-task">
                <input value={input} onChange={onChange}/>
                <button onClick={onClick}></button>
            </div>
            <div className="list">
                <ul>
                    {tasks.map((e) => {
                        return <li>{e.key}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;

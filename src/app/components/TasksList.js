"use client"
// eslint-disable-next-line no-unused-vars
import styles from '../styles/TasksList.module.css'
import { useState } from 'react';
import Modal from './Modal';
import Task from './Task';

function TaskList() {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({});
    const [filter, setFilter] = useState('all');

    function toggleModal() {
        setModal(!modal);
    }

    function filterTasks(task) {
        if (filter === 'all') {
            return true;
        } else if (filter === 'completed') {
            return task.completed;
        } else {
            return !task.completed;
        }
    }

    return (
        <>
            <section className={`${styles['section-container']} container`}>
                <div className='d-flex justify-content-between mb-3 align-items-center'>
                    <h4 className={`${styles.title}`}>Important Tasks</h4>
                    <div>
                        <span style={{ cursor: "pointer" }} onClick={toggleModal}>➕</span>
                        <button onClick={() => setFilter('all')}>All</button>
                        <button onClick={() => setFilter('completed')}>Completed</button>
                        <button onClick={() => setFilter('notCompleted')}>Not Completed</button>
                    </div>
                </div>
                <div className="row">
                    {tasks.filter(filterTasks).map((task, i) => (
                        <Task key={i} toggleModal={toggleModal} setTaskData={setTaskData} setTasks={setTasks} task={task} />
                    ))}
                    <div className="col-md-3">
                        <div style={{cursor:"pointer"}} onClick={toggleModal} className="d-flex justify-content-center align-items-center p-5 border rounded-1">
                            <h5>➕add new task</h5>
                        </div>
                    </div>
                </div>
            </section>

            {modal && <Modal setTaskData={setTaskData} taskData={taskData} setTasks={setTasks} tasks={tasks} toggleModal={toggleModal} />}
        </>
    );
}

export default TaskList;
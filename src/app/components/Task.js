/* eslint-disable react/prop-types */
import styles from '../styles/Task.module.css'
function Task({ task, setTasks,toggleModal ,setTaskData}) {
    const { title, description, date, completed } = task
    function deleteTask(i) {
        setTasks((tasks) => tasks.filter((task) => task.title !== i))
    }
    function toggleCompleted(i) {
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task.title === i ? { ...task, completed: !task.completed } : task
            );
        });
    }
    function getTaskToBeUpdated(taskData) {
            console.log(taskData);
            setTaskData(taskData)
            toggleModal()
        
    }
    return (
        <>
            <div className={`col-md-3`}>
                <div className={`${styles.cardBG} task p-3 border rounded-1`}>
                    <h5>{title}</h5>
                    <p>{description}</p>

                    <span className='mt-3'>{date}</span>

                    <div className='d-flex justify-content-between align-items-center p-0 mt-1'>
                        <p style={{ cursor: "pointer" }} onClick={() => toggleCompleted(title)} className={`${completed ? 'bg-success' : 'bg-danger'} m-0 px-2 py-1 rounded rounded-pill`}>{completed ? 'completed' : 'not completed'}</p>
                        <div className="d-flex">
                            <div style={{ cursor: "pointer" }} onClick={() => deleteTask(title)}>
                                🚮 delete
                            </div>
                            <div style={{ cursor: "pointer" }} className="ms-3" onClick={()=>getTaskToBeUpdated(task)}>
                                📃 edit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task

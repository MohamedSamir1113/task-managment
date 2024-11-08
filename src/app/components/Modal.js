"use client"
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import styles from '../styles/Modal.module.css'
import { useForm } from 'react-hook-form'
function Modal({ toggleModal, setTasks, taskData, setTaskData }) {
    const { title, description, date, completed } = taskData
    const { register, handleSubmit, formState: { errors }, setValue ,reset} = useForm()

    function updateTask(id, updatedTask) {
        setTasks((tasks) => tasks.map(task => (task.title === id ? { ...task, ...updatedTask } : task)));
    }
    function onSubmit(data) {
        if (title) {
            updateTask(title, data);
            setTaskData({}); // Clear the taskData state
            reset(); // Reset the form fields
            toggleModal();
        } else {
            setTasks((tasks) => [...tasks, { ...data, completed: false }]);
            reset(); // Reset the form fields
            toggleModal();
        }
    }
    useEffect(() => {
        if (taskData) {
            setValue("title", title);
            setValue("description", description);
            setValue("date", date);
            setValue("completed", completed);
        }

    }, [title, description, date, completed, setValue, taskData]);
    return (
        <>
            <div className={`${styles.modal}`}>
                <div className={`${styles.overlay}`}></div>
                <div className={`${styles['modal-content']}`}>
                    <div style={{backgroundColor:"rgb(33 33 33)"}} className='rounded-1 text-white p-2'>
                        <h3>create a task</h3>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="">Title:</label>
                                <input {...register("title", { required: "title is required" })} type="text" className='form-control w-75' />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Description:</label>
                                <textarea {...register("description", { required: "description is required" })} type="text" className='form-control w-75' />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Date:</label>
                                <input {...register("date", { required: "date is required" })} type="date" className='form-control w-75' />
                            </div>
                            <div className='mt-3 d-flex align-items-center w-75 justify-content-between'>
                                <label htmlFor="">Completed</label>
                                <input {...register("completed")}  type="checkbox" className='p-0 ms-3 mt-1' />
                            </div>

                            <div className='w-75 mt-3 ms-0'>
                                {title ? <button className='btn btn-warning'>➕ update Task</button> : <button className='btn btn-success'>➕ create Task</button>}
                            </div>

                        </form>
                    </div>
                </div>

                <span style={{ cursor: "pointer" }} onClick={toggleModal} className='position-absolute top-0 end-0 m-5'>✖</span>
            </div>
        </>
    )
}

export default Modal

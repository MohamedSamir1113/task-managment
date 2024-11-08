import { useEffect } from 'react'
import styles from '../styles/Modal.module.css'
import { useForm } from 'react-hook-form'

export default function Modal({ toggleModal, setTasks, taskData, setTaskData }) {
    const { title, description, date, completed } = taskData
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    useEffect(() => {
        if (taskData) {
            setValue("title", title);
            setValue("description", description);
            setValue("date", date);
            setValue("completed", completed);
        }
    }, [title, description, date, completed, setValue, taskData]);

    async function onSubmit(data) {
        let response;
        if (title) {
            // Update existing task
            response = await fetch(`/api/tasks?title=${title}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        } else {
            // Create new task
            response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, completed: false }),
            });
        }

        const updatedTask = await response.json();
        setTasks(tasks => title ? tasks.map(t => t.title === title ? updatedTask : t) : [...tasks, updatedTask]);

        reset(); // Reset the form fields
        setTaskData({});
        toggleModal();
    }

    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.overlay}`}></div>
            <div className={`${styles['modal-content']}`}>
                <div style={{backgroundColor:"rgb(33 33 33)"}} className='p-2 rounded-1 text-white'>
                    <h3>{title ? "Edit Task" : "Create a Task"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="">Title:</label>
                        <input {...register("title", { required: "title is required" })} type="text" className='form-control w-75' />
                        <label htmlFor="">Description:</label>
                        <textarea {...register("description", { required: "description is required" })} type="text" className='form-control w-75' />
                        <label htmlFor="">Date:</label>
                        <input {...register("date", { required: "date is required" })} type="date" className='form-control w-75' />
                        <div className='d-flex align-items-center mt-3'>
                            <label>Completed</label>
                            <input {...register("completed")} type="checkbox" className='ms-3' />
                        </div>
                        <button className='btn btn-success mt-3'>{title ? "Update Task" : "Create Task"}</button>
                    </form>
                </div>
            </div>
                <span onClick={toggleModal} style={{cursor:"pointer"}} className='position-absolute top-0 end-0 m-5'>✖</span>
        </div>
    );
}

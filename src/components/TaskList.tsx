import store from '@/utils/TaskStore';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

interface ITask {
    title: string;
    description: string;
    status: string;
}

const TaskList: React.FC = observer(() => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskMenu, setTaskMenu] = useState<boolean>(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);

    useEffect(() => {
        const tasksFrmLocal = store.tasks;
        setTasks(tasksFrmLocal)
    }, [])

    const openTaskMenu = (index: number) => {
        setSelectedTaskIndex(index);
        setTaskMenu(!taskMenu);
    };

    return (
        <div>
            <h2 className='mb-5 text-2xl font-medium text-gray-600'>Task List</h2>
            <div className='grid md:grid-cols-4 gap-5'>
                {tasks && tasks?.map((task, index) => (
                    <div key={index} className={`border-l-4 p-4 shadow-lg space-y-3 rounded-md relative bg-slate-50 ${task.status === "In Progress" ? "border-violet-300" : task.status === "Completed" ? "border-green-300" : "border-red-300"}`}>
                        <button onBlur={() => setTaskMenu(false)} onClick={() => openTaskMenu(index)} className='absolute top-0 right-0 py-2 px-1 hover:text-blue-700'>
                            <HiOutlineDotsVertical className='text-xl'></HiOutlineDotsVertical>
                        </button>
                        {
                            selectedTaskIndex === index && taskMenu && (
                                <div className='absolute flex flex-col top-5 right-0 bg-slate-50 p-2 gap-1'>
                                    <button className='hover:bg-blue-300 bg-blue-100 px-1 py-1 rounded-md text-sm'>Edit</button>
                                    <button className='hover:bg-blue-300 bg-blue-100 px-1 py-1 rounded-md text-sm'>Delete</button>
                                </div>)
                        }
                        <h3 className='text-xl font-medium border-b pb-1'>{task?.title}</h3>
                        <p className='text-sm'>{task?.description}</p>
                        <p>Status: {task?.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default TaskList;

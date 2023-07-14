import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useStore } from '@/utils/TaskStore';

const AddTaskModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    const taskStore = useStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [closeModal]);

    const handleAddTask = (e: FormEvent) => {
        e.preventDefault();
        taskStore.addTask({
            title,
            description,
            status,
        });
        setTitle('');
        setDescription('');
        setStatus('');
        closeModal();
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80">
            <div className="bg-white m-5 rounded-lg p-8 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 bg-red-500 text-white px-3 py-2 rounded-full"
                >
                    X
                </button>
                {/* Modal content */}
                <div className="max-w-xl mx-auto flex w-full flex-col border rounded-lg bg-white p-5">
                    <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
                        Add Task
                    </h2>

                    <form onSubmit={handleAddTask}>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="text-sm leading-7 text-gray-600"
                            >
                                Task Title
                            </label>
                            <input type="text" id='title' value={title} onChange={handleTitleChange} className="w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="text-sm leading-7 text-gray-600"
                            >
                                Description
                            </label>
                            <textarea rows={3} value={description} onChange={handleDescriptionChange} className="w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" id='description' />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="Status"
                                className="text-sm leading-7 text-gray-600"
                            >
                                Status
                            </label>
                            <select id="status" value={status} onChange={handleStatusChange}
                                className="w-full py-2 border border-gray-300 focus:outline-none focus:border-sky-500 text-gray-700 rounded px-2 md:px-3 tracking-wider">
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddTaskModal;

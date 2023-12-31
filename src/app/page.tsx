'use client'
import AddTaskModal from '@/components/AddTaskModal';
import TaskList from '@/components/TaskList';
import { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="md:px-28 px-5 my-10">

      <div className='flex gap-5'>

        <button className='bg-gray-100 p-5 text-center md:w-2/12 w-6/12 rounded-md' onClick={openModal}>
          <h1 className='text-5xl mb-3'>+</h1>
          <p >Add Task</p>
        </button>

        <div className='bg-blue-100 p-5 rounded-md'>
          <h3 className='text-xl text-red-600'>Instruction :</h3>
          <ul className='list-disc list-inside text-xs md:text-sm space-y-2 mt-2'>
            <li>To add task, click on Add Task Button.</li>
            <li>Added Task shown below.</li>
            <li>To delete or update an existing task, click <HiOutlineDotsVertical className='inline'></HiOutlineDotsVertical></li>
          </ul>
        </div>
        
      </div>

      <div className='mt-10'>
        <TaskList></TaskList>
      </div>

      {isModalOpen && <AddTaskModal closeModal={closeModal} />}
    </div>
  )
}

export default Home;
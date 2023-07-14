'use client'
import AddTaskModal from '@/components/AddTaskModal';
import { useState } from 'react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className="md:px-28 px-5 my-10">
      <div className='flex gap-5'>
        <button className='bg-gray-100 p-5 text-center' onClick={openModal}>
          <h1 className='text-5xl mb-3'>+</h1>
          <p >Add Task</p>
        </button>
      
        <div className='bg-blue-100 p-5'>
          <h3 className='border-b border-black'>Instruction</h3>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>

      <div className='mt-10'>
        <h1>My Task</h1>
      </div>
      {isModalOpen && <AddTaskModal closeModal={closeModal} />}
    </main>
  )
}

export default Home;
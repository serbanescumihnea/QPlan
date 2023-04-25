import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';
import '../components/task'
import useSWR from 'swr';
import { Task } from '../components/task';



const fetcher = (url: string) => fetch(url).then((res) => res.json());
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

var colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-sky-500', 'bg-teal-500', 'bg-emerald-500', 'bg-lime-500']
type taskDataType = { name: string, description: string, priority: string, status: string, project: string }


export default function Tasks(props: any) {
  const [currentTasks, setCurrentTasks] = useState([]);

  const [newTaskDialog,setNewTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription,setNewTaskDescription] = useState('');
  const [input, setInput] = useState(null);





  const fetchTasks = async () => {
    const task = await window.electron.getTasks();
    setCurrentTasks(task);
  }

  const newTask = async() =>{
    const sendTask = await window.electron.postTasks(newTaskTitle,newTaskDescription,"High",props.project);
    fetchTasks();
    setNewTaskDialog(false);
  }
  useEffect(() => {

    fetchTasks();

  }, []);

  return (
    <div className="min-h-screen  h-full flex  pl-64 pb-12  bg-gray-100">
      <nav
        id="sidenav-2"
        className="fixed border-r-2 border-gray-300 left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode="side"
        data-te-sidenav-content="#content">
        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>

          <li className="relative">
            <a onClick={() => props.pageSwap("projects")}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-3 ml-0.5  [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>folder_fill [#1774]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -1199.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M284,1057.0005 C284,1058.1055 284.895,1059.0005 286,1059.0005 L302,1059.0005 C303.105,1059.0005 304,1058.1055 304,1057.0005 L304,1049.0005 L284,1049.0005 L284,1057.0005 Z M304,1045.0005 L304,1047.0005 L284,1047.0005 L284,1041.0005 C284,1039.8955 284.895,1039.0005 286,1039.0005 L292,1039.0005 C293.105,1039.0005 294,1039.8955 294,1041.0005 L294,1042.0005 C294,1042.5525 294.448,1043.0005 295,1043.0005 L302,1043.0005 C303.105,1043.0005 304,1043.8955 304,1045.0005 L304,1045.0005 Z" id="folder_fill-[#1774]"> </path> </g> </g> </g> </g></svg>
              </span>
              <span>Projects</span>
            </a>
          </li>
          <li className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="gray"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>work-case-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="gray" transform="translate(42.666667, 64.000000)"> <path d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z" id="Combined-Shape-Copy"> </path> </g> </g> </g></svg>
              </span>
              <span>My work</span>
            </a>
          </li>
          <li className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg fill="gray" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>time</title> <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016zM14.016 16v-5.984q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408v4h4q0.8 0 1.408 0.576t0.576 1.408-0.576 1.44-1.408 0.576h-6.016q-0.832 0-1.408-0.576t-0.576-1.44z"></path> </g></svg>
              </span>
              <span>Time Tracker</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className='flex flex-col items-center w-full'>
      <div className=' text-center text-3xl font-semibold mt-5 border-b-2 border-gray-200 w-9/12 pb-2'>
      <p className='text-gray-600'>{props.project}</p>
      </div>
      <div className='grid grid-cols-3 2xl:grid-cols-4  h-fit  mt-10 ml-10 mr-10 gap-12'>
        {currentTasks.map((spawnedTask: {project:string,status:string,name:string,description:string},i) => {
          if(spawnedTask.project===props.project){

          return  <Task id={i} name={spawnedTask.name} description={spawnedTask.description} status={spawnedTask.status} />
          }
        })
        }



        {!newTaskDialog ?
        <button onClick={()=>{setNewTaskDialog(true)}} className='flex relative h-48  items-center justify-center h-fit flex-col bg-gray-100 rounded-lg shadow-md border-4 border-dotted gap-4 text-center hover:text-lg px-20 py-10 hover:bg-gray-300 transition-all'>
          <div className='flex flex-col justify-center items-center'>
            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus_Square"> <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
            <p className=''>New task</p>
          </div>
        </button>
  :  <div>
  <div className={`flex h-fit  relative flex-col bg-white rounded-lg   shadow-md gap-4 text-center px-20 py-10`}>
   <input className="text-center rounded-lg border-2 py-1" placeholder='Task title' onChange={(e)=>setNewTaskTitle(e.target.value)}/>
  <input className="text-center rounded-lg border-2 py-1" placeholder='Task description' onChange={(e)=>setNewTaskDescription(e.target.value)}/>
          <button onClick={()=>newTask()} className='bg-blue-500 py-2 rounded-lg mt-2 text-white'>Add task</button>

  </div>

  </div>



}


      </div>
      </div>
    </div>

  );
}

/*


 return (


*/

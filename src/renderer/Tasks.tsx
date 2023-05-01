import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Task } from '../components/task';
import { Group } from 'components/group';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const colors = [
  'bg-blue-500',
  'bg-red-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-sky-500',
  'bg-teal-500',
  'bg-emerald-500',
  'bg-lime-500',
];
type taskDataType = {
  name: string;
  description: string;
  priority: string;
  status: string;
  project: string;
};

export default function Tasks(props: any) {
  const [currentTasks, setCurrentTasks] = useState([]);

  const [newTaskDialog, setNewTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [input, setInput] = useState(null);
  const [fetchedTasks,setFetchedTasks] = useState([]);
  const [githubLoaded,setGithubLoaded] = useState(false);
  const [labels, setLabels] = useState([]);
  const newLabelName = useRef();
  const { data, error, isLoading } = useSWR(
    props.username ? `https://api.github.com/repos/${props.username}/${props.project}/issues` : null,
    fetcher
  );

  const fetchTasks = async () => {
    setCurrentTasks([]);
    const task = await window.electron.getTasks('UNLABELED');
   setCurrentTasks(task);
  };

  const fetchLabels = async () =>{
    setLabels([]);
    const taskLabels = await window.electron.getLabels(props.project);
    if(taskLabels!=undefined)
      setLabels(taskLabels.labels);
  }
  const addLabel = async()=>{
    if(newLabelName!=undefined){
      const addTaskLabels = await window.electron.postLabels(props.project,newLabelName.current.value);
      fetchLabels();
    }
  }

  const handleKeyDown = (event)=>{
    if(event.key==="Enter"){
      addLabel();
    }
  }

  const addGithubIssues = async ()=>{
      const sendIssues = await window.electron.addIssues(props.project,data);
      setGithubLoaded(!githubLoaded);
  }

  const newTask = async (labelName:String) => {
    const sendTask = await window.electron.postTasks(
      newTaskTitle,
      newTaskDescription,
      'High',
      props.project,
      labelName
    );
    fetchTasks();
    setNewTaskDialog(false);
  };
  useEffect(() => {
    fetchTasks();
    fetchLabels();
    setFetchedTasks(data);
  }, []);
  if(!isLoading)
  return (
    <div className="min-h-screen  h-full flex  pl-64 pb-12  bg-gray-100">
      <nav
        id="sidenav-2"
        className="fixed border-r-2 border-gray-300 left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode="side"
        data-te-sidenav-content="#content"
      >
        <ul
          className="relative m-0 list-none px-[0.2rem]"
          data-te-sidenav-menu-ref
        >
          <li className="relative">
            <a
              onClick={() => props.pageSwap('projects')}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref
            >
              <span className="mr-4 [&>svg]:h-4 [&>svg]:w-3 ml-0.5  [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <title>folder_fill [#1774]</title>{' '}
                    <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {' '}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-340.000000, -1199.000000)"
                        fill="#000000"
                      >
                        {' '}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {' '}
                          <path
                            d="M284,1057.0005 C284,1058.1055 284.895,1059.0005 286,1059.0005 L302,1059.0005 C303.105,1059.0005 304,1058.1055 304,1057.0005 L304,1049.0005 L284,1049.0005 L284,1057.0005 Z M304,1045.0005 L304,1047.0005 L284,1047.0005 L284,1041.0005 C284,1039.8955 284.895,1039.0005 286,1039.0005 L292,1039.0005 C293.105,1039.0005 294,1039.8955 294,1041.0005 L294,1042.0005 C294,1042.5525 294.448,1043.0005 295,1043.0005 L302,1043.0005 C303.105,1043.0005 304,1043.8955 304,1045.0005 L304,1045.0005 Z"
                            id="folder_fill-[#1774]"
                          >
                            {' '}
                          </path>{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>
                </svg>
              </span>
              <span>Projects</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col items-center w-full">
        <div className=" text-center text-3xl font-semibold mt-5 border-b-2 border-gray-200 w-9/12 pb-2">
          <p className="text-gray-600">{props.project}</p>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-fit  mt-10 ml-10 mr-10 gap-24">
        <Group loaded={githubLoaded} project={props.project} labelName='UNLABELED' />
          {labels && labels.map((object)=>{
             return <Group loaded={true} project={props.project} labelName={object} />
          })}





          <div className='rounded-lg shadow-md bg-green-400 h-12 flex stroke-gray-500 '>
            <input onKeyDown={handleKeyDown} type='text' ref={newLabelName} className='bg-gray-200  py-1 px-3 placeholder-black  ' placeholder='New label title...'/>
           <button onClick={()=>addLabel()} className='flex items-center justify-center w-full text-white font-bold'><p>Add</p></button>
          </div>
        </div>
      </div>
      <div onClick={()=>addGithubIssues()} className='absolute fixed bottom-10 right-10'><button className='flex fixed bottom-10 right-10 items-center gap-4 shadow-lg rounded-md hover:scale-105 transition-all hover:bg-purple-600 bg-purple-500 px-4 py-2 text-white'><svg className='w-6' fill="#FFFFFF" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m807.186 686.592 272.864 272.864H0v112.94h1080.05l-272.864 272.978 79.736 79.849 409.296-409.183-409.296-409.184-79.736 79.736ZM1870.419 434.69l-329.221-329.11C1509.688 74.07 1465.979 56 1421.48 56H451.773v730.612h112.94V168.941h790.584v451.762h451.762v1129.405H564.714v-508.233h-112.94v621.173H1920V554.52c0-45.176-17.619-87.754-49.58-119.83Zm-402.181-242.37 315.443 315.442h-315.443V192.319Z" fill-rule="evenodd"></path> </g></svg><p>Import from Github</p></button></div>
    </div>
  );
}

/*


 return (


*/

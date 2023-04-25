import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Octokit } from '@octokit/core';
import './App.css';
import './build.css';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Tasks from './Tasks';



const fetcher = (url: string) => fetch(url).then((res) => res.json());
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

var colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-sky-500', 'bg-teal-500', 'bg-emerald-500', 'bg-lime-500']



function Main() {
  const [input, setInput] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription,setNewDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [page, setPage] = useState('projects');
  const [username, setUsername] = useState(null);

  const {data,error,isLoading} = useSWR( username ? `https://api.github.com/users/${username}/repos` : null,fetcher);

  const fetchProjects = async () => {
    const fetchedProjects = await window.electron.getProjects();
    setProjects(fetchedProjects);

  }
  async function loadGithub(){
    const github = await window.electron.getGithub();
    setUsername(github);
  }
  function changePage(page) {
    setPage(page);
  }
  async function changeUsername() {
    setUsername(input);
    const githubPost = await window.electron.postGithub(input);
  }
  async function addProject(){
    const addProject = await window.electron.postProjects(newName,newDescription);
    fetchProjects();
  }
  useEffect(() => {
    fetchProjects();
    loadGithub();
  }, [])


  if (page === "projects")
    return (
      <div className="h-fit flex min-h-screen items-center pl-60   justify-center bg-gray-100">
      {addModal && <div className="fixed h-full w-full top-0 flex items-center justify-center z-40 bg-opacity-50 bg-gray-700">

    <div className="z-10">
      <div
        className="p-12 text-center bg-white rounded-lg shadow-lg"
      >
        <p className='text-lg font-bold'>Add a new project</p>
        <div className='mt-10  flex-col'>
        <div className='flex items-center gap-5 '>
          <p className='mr-9'>Name:</p>
          <input onChange={(e)=>setNewName(e.target.value)} className='p-2 border-2 border-gray-300 rounded-md' />
          </div>
          <div className='flex mt-5 items-center gap-5 '>
          <p>Description:</p>
          <input onChange={(e)=>setNewDescription(e.target.value)} className='p-2 border-2 border-gray-300 rounded-md' />
          </div>
        </div>
        <button onClick={()=>{setAddModal(false);addProject()}} className='mt-12 bg-blue-400 rounded-lg py-2 px-10 text-white'>Add</button>
        <button onClick={()=>{setAddModal(false)}} className='mt-12 ml-4 bg-red-400 rounded-lg py-2 px-10 text-white'>Close</button>
      </div>
    </div>
  </div>}
        <nav
          id="sidenav-2"
          className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-mode="side"
          data-te-sidenav-content="#content">
          <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>

            <li className="relative">
              <a

                className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref>
                <span
                  className="mr-4 [&>svg]:h-4 [&>svg]:w-3 ml-0.5  [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                  <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>folder_fill [#1774]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -1199.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M284,1057.0005 C284,1058.1055 284.895,1059.0005 286,1059.0005 L302,1059.0005 C303.105,1059.0005 304,1058.1055 304,1057.0005 L304,1049.0005 L284,1049.0005 L284,1057.0005 Z M304,1045.0005 L304,1047.0005 L284,1047.0005 L284,1041.0005 C284,1039.8955 284.895,1039.0005 286,1039.0005 L292,1039.0005 C293.105,1039.0005 294,1039.8955 294,1041.0005 L294,1042.0005 C294,1042.5525 294.448,1043.0005 295,1043.0005 L302,1043.0005 C303.105,1043.0005 304,1043.8955 304,1045.0005 L304,1045.0005 Z" id="folder_fill-[#1774]"> </path> </g> </g> </g> </g></svg>
                </span>
                <span >Projects</span>
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
        <div className='flex p-20 h-full items-center justify-center'>
          {data ? <div className='grid grid-cols-2 w-full h-full gap-x-20  '>
            {data.map(function (object, i) {
              var color = colors[getRandomInt(10)];
              return (<div onClick={() => { setPage('tasks'); setProject(object.name) }} className={`${color} cursor-pointer text-white m-4 rounded-lg shadow-lg flex items-center  flex-col justify-center p-8 hover:scale-110 transition-all hover:border border-black`}><p className='mb-4 font-bold text-lg'>
                {object.name}</p><p>{object.description}</p>

              </div>)
            })}
            {projects.map(function (object, i) {
              var color = colors[getRandomInt(10)];
              return (<div onClick={() => { setPage('tasks'); setProject(object.name) }} className={`${color}  cursor-pointer text-white m-4 rounded-lg shadow-lg flex items-center  flex-col justify-center p-8 hover:scale-110 transition-all hover:border border-black`}><p className='mb-4 font-bold text-lg'>
                {object.name}</p><p>{object.description}</p>

              </div>)
            })
            }
          </div>
          :
          <div className='bg-gray-50 flex flex-col gap-4 rounded-lg shadow-lg py-8 px-24'>
            <input placeholder='GITHUB USERNAME' onChange={e => setInput(e.target.value)} className='py-3 font-bold text-center px-12 border-gray-200 border rounded-md'></input>
            <button onClick={() => changeUsername()} className='px-6 py-2 bg-blue-500 text-white rounded-lg'>Load Github repositories</button>
          </div>}
        </div>
        <button onClick={()=>setAddModal(true)} className='w-14 flex rounded-full p-3 border group shadow-md bg-green-400 fixed bottom-10 right-10 hover:rounded-lg hover:bg-green-500 hover:border-green-500 hover:text-white  hover:w-48 transition-all hover:gap-4 '>
          <svg className='w-8 group-hover:w-6 fill-white group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="plus"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)"></rect><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"></path></g></g></svg>
          <div className='hidden group-hover:block font-bold'>Add a project</div>
        </button>

      </div>
    );
  else if (page === "tasks")
    return <Tasks pageSwap={(e) => setPage(e)} project={project} />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />

      </Routes>
    </Router>
  );
}


/*

*/

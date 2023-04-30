import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useRef, useState } from 'react';


export default function Tasks(props: any) {
  const newUsername = useRef();
  const [confirmModal,setConfirmModal] = useState(false);
  function changeUsername(){
      props.setUsername(newUsername.current.value);
  }
  async function deleteAllData(){
    const deleteData = await window.electron.deleteAllData();
    setConfirmModal(false);
  }

  return(
    <div className="h-fit flex min-h-screen items-center pl-60   justify-center bg-gray-100">
        {confirmModal && (
          <div className="fixed h-full w-full top-0 flex items-center justify-center z-40 bg-opacity-50 bg-gray-700">
            <div className="z-10">
              <div className="p-12 text-center bg-white rounded-lg shadow-lg">
                <p className="text-lg font-bold">Are you sure you want to delete all local data?</p>
                <button onClick={()=>deleteAllData()} className='mt-10 mr-10 bg-red-500 text-white py-2 px-2 rounded-md'>Yes, delete everything</button>
                <button onClick={()=>setConfirmModal(false)} className='bg-green-400 text-white py-2 px-5 rounded-md'>No</button>
                 </div>
            </div>
          </div>
        )}
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
    <div className='w-full'>
      <div className='w-full flex flex-col items-center justify-center h-full'>
        <div className='bg-white rounded-lg shoadw-lg p-8'>
        <p className='mb-24 text-center font-bold text-lg'>Settings</p>
        <div className='flex flex-col gap-6 px-24'>
          <input ref={newUsername} className='p-2 border-2 shadow-sm rounded-lg' placeholder={props.username}/>
          <button className='bg-blue-400 py-2 rounded-lg text-white ' onClick={()=>changeUsername()}>Change Github profile</button>
          <button onClick={()=>setConfirmModal(true)} className='bg-red-600 py-2 rounded-lg text-white mt-24'>DELETE ALL CONTENT</button>
        </div>
        </div>
      </div>
</div>
    </div>
  )
}

/*


 return (


*/

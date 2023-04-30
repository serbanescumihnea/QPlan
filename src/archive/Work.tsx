import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';
import {  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

var colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-sky-500', 'bg-teal-500', 'bg-emerald-500', 'bg-lime-500']

const data = [
  {

    project: "Project10",
    timeSpent: 12,

  },
  {

    project: "Project6",
    timeSpent: 32,

  },
  {

    project: "Project1",
    timeSpent: 23,

  },
  {

    project: "Project7",
    timeSpent: 10,

  },
  {

    project: "Project3",
    timeSpent: 23,

  },
  {

    project: "Project4",
    timeSpent:75,

  },
  {

    project: "Project2",
    timeSpent: 86,

  },
];

const data2 = [
  {

    name: "Project10",
    progress: 12,
    fill: "#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project6",
    progress: 32,
    fill: "#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project1",
    progress: 23,
    fill:"#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project7",
    progress: 10,
    fill: "#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project3",
    progress: 75,
    fill:"#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project4",
    progress:75,
    fill:"#"+Math.floor(Math.random()*16777215).toString(16),
  },
  {

    name: "Project2",
    progress: 75,
    fill:"#"+Math.floor(Math.random()*16777215).toString(16),

  },
];

const style = {
  top: 20,
  right:-30,
  lineHeight: "24px",
  color:"black",
};


type taskDataType = { name: string, description: string, priority: string, status: string, project: string }


export default function Work(props: any) {




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
          <li className="relative"  onClick={()=>props.pageSwap("work")}>
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

        </ul>
      </nav>
      <div className='w-full flex gap-24 '>
      <div className='w-1/3 flex flex-col items-center justify-center gap-4 '>
    <p className='font-bold'>Your favorite projects</p>
      <ResponsiveContainer width="100%" height="50%" className={'bg-white shadow-lg rounded-lg '}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid  />
          <PolarAngleAxis dataKey="project" />
          <PolarRadiusAxis />
          <Radar  dataKey="timeSpent" stroke="#8854d8" fill="#6884d8" fillOpacity={1} />
        </RadarChart>
    </ResponsiveContainer>
    </div>
    <div className='w-1/2 flex flex-col items-center justify-center gap-4 '>
    <p  className='font-bold'>Progress Tracker</p>
    <ResponsiveContainer width="100%" height="50%" className={'bg-white shadow-lg rounded-lg '}>

    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data2}>
          <RadialBar
            minAngle={15}

            background
            clockWise
            dataKey="progress"
          />
 <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={style}
      />

        </RadialBarChart>

    </ResponsiveContainer>

  </div>
  </div>
  </div>

  );
}

/*


 return (


*/

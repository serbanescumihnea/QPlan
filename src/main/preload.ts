// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';



//contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('electron',{
  getLabels:async(projectName: string)=>ipcRenderer.invoke('get:labels',projectName),
  postLabels:async(projectName: string,name:string)=>ipcRenderer.invoke('post:labels',projectName,name),
  getGithub: async () => ipcRenderer.invoke('get:github'),
  postGithub: async (id:any) => ipcRenderer.invoke('post:github',id),
  addIssues:async(...args: any)=>ipcRenderer.invoke('add:issues',...args),
  getProjects: async () => ipcRenderer.invoke('get:projects'),
  postProjects:async(title: any,description: any)=>ipcRenderer.invoke('post:projects',title,description),
  getTasks: async (labelName:string) => ipcRenderer.invoke('get:tasks',labelName),
  postTasks:async(title: any,description: any,priority: any,project: any,labelName:any)=>ipcRenderer.invoke('post:tasks',title,description,priority,project,labelName),
  updateTasks:async(id:number,title: any,description: any,status: any)=>ipcRenderer.invoke('update:tasks',id,title,description,status),
  deleteTask:async(id:number)=>ipcRenderer.invoke('delete:tasks',id),
  deleteAllData:async()=>ipcRenderer.invoke('delete:all'),
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
})



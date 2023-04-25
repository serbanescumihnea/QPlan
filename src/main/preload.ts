// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';



//contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('electron',{
  getGithub: async () => ipcRenderer.invoke('get:github'),
  postGithub: async (id:any) => ipcRenderer.invoke('post:github',id),
  getProjects: async () => ipcRenderer.invoke('get:projects'),
  postProjects:async(title: any,description: any)=>ipcRenderer.invoke('post:projects',title,description),
  getTasks: async () => ipcRenderer.invoke('get:tasks'),
  postTasks:async(title: any,description: any,priority: any,project: any)=>ipcRenderer.invoke('post:tasks',title,description,priority,project),
  updateTasks:async(id:number,title: any,description: any,status: any)=>ipcRenderer.invoke('update:tasks',id,title,description,status),
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



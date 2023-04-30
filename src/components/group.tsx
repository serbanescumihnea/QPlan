import React from 'react';
import { Task } from './task';

export class Group extends React.Component<{loaded:boolean,labelName:string,project:string}>{

  constructor(props: any) {
    super(props);
    this.state = {
      fetchedTasks:[],
      newTaskDialog:false,
      newTaskTitle:'',
      newTaskDescription:'',
    };
    this.fetchTasks = this.fetchTasks.bind(this);
  }




  fetchTasks = async () => {
    this.setState({fetchedTasks:[]});
    const task = await window.electron.getTasks(this.props.labelName);
    this.setState({fetchedTasks:task});

  };

   newTask = async () => {
    const sendTask = await window.electron.postTasks(
      this.state.newTaskTitle,
      this.state.newTaskDescription,
      'High',
      this.props.project,
      this.props.labelName,
    );
    this.fetchTasks();
    this.setState({newTaskDialog:false});
  };


  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loaded !== this.props.loaded) {
      this.fetchTasks();
    }
  }


  render(): React.ReactNode {
    return(
    <div className='relative bg-gray-200 h-fit w-72 pr-5  flex flex-col shadow-md gap-5 rounded-lg py-5 pt-12 pl-6'>
            <p className='absolute top-2 text-gray-500 font-black '>{this.props.labelName}</p>
          {this.state.fetchedTasks.map(
            (
              spawnedTask: {
                id:number,
                project: string;
                status: string;
                name: string;
                description: string;
              },

            ) => {
              if (spawnedTask.project === this.props.project) {
                return (
                  <Task
                    fetchTasks={this.fetchTasks}
                    id={spawnedTask.id}
                    name={spawnedTask.name}
                    description={spawnedTask.description}
                    status={spawnedTask.status}
                  />
                );
              }
            }
          )}
            {!this.state.newTaskDialog ? (
            <button
              onClick={() => {
                this.setState({newTaskDialog:true});
              }}
              className="flex relative h-48  items-center justify-center h-fit flex-col bg-gray-100 rounded-lg shadow-md border-4 border-dotted gap-4 text-center hover:text-lg px-20 py-10 hover:bg-gray-300 transition-all"
            >

              <div className="flex flex-col justify-center items-center">
                <svg
                  className="w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <g id="Edit / Add_Plus_Square">
                      {' '}
                      <path
                        id="Vector"
                        d="M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
                        stroke="gray"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{' '}
                    </g>{' '}
                  </g>
                </svg>
                <p className="">New task</p>
              </div>
            </button>
          ) : (
            <div className='relative'>
               <p className='absolute top-0 right-2 z-50 font-black text-gray-600 cursor-pointer' onClick={()=> this.setState({newTaskDialog:false})}>x</p>
              <div className="flex h-fit  relative flex-col bg-white rounded-lg   shadow-md gap-4 text-center px-5  2xl:px-10 py-10">
                <input
                  className="text-center rounded-lg border-2 py-1"
                  placeholder="Task title"
                  onChange={(e) => this.setState({newTaskTitle:e.target.value})}
                />
                <input
                  className="text-center rounded-lg border-2 py-1"
                  placeholder="Task description"
                  onChange={(e) => this.setState({newTaskDescription:e.target.value})}
                />
                <button
                  onClick={() => this.newTask()}
                  className="bg-blue-500 py-2 rounded-lg mt-2 text-white"
                >
                  Add task
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }


}

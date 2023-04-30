import React from 'react';

export class Task extends React.Component<
  {
    fetchTasks: Function;
    id: number;
    name: string;
    description: string;
    status: string;
  },
  {}
> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'view',
      name: this.props.name,
      description: this.props.description,
      status: this.props.status,
    };
    this.update = this.update.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    if (this.props.status === 'IN PROGRESS')
      this.setState({ color: 'border-blue-500' });
    else if (this.props.status === 'DONE')
      this.setState({ color: 'border-green-500' });
    else this.setState({ color: 'border-red-500' });
  }

  async removeTask() {
    const deleteAction = await window.electron.deleteTask(this.props.id);
    this.props.fetchTasks();
  }

  async update() {
    if (this.state.status === 'IN PROGRESS')
      this.setState({ color: 'border-blue-500' });
    else if (this.state.status === 'DONE')
      this.setState({ color: 'border-green-500' });
    else this.setState({ color: 'border-red-500' });
    const update = await window.electron.updateTasks(
      this.props.id,
      this.state.name,
      this.state.description,
      this.state.status
    );
  }

  render(): React.ReactNode {
    return (
      <div draggable >
        <div
          className={`flex h-fit  relative flex-col bg-white rounded-lg border-b-4 ${this.state.color} shadow-md gap-4 text-center px-4 2xl:px-20 py-10`}
        >
          <button
            title="Delete"
            onClick={() => this.removeTask()}
            className="absolute top-0 right-0 hover:scale-105"
          >
            <svg
              className="w-6"
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
                <path
                  d="M10 11V17"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
                <path
                  d="M14 11V17"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
                <path
                  d="M4 7H20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
              </g>
            </svg>
          </button>
          {this.state.mode === 'view' ? (
            <p className="break-words font-semibold text-lg">
              {this.state.name}
            </p>
          ) : (
            <input
              className="text-center rounded-lg border-2 py-1"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          )}
          {this.state.mode === 'view' ? (
            <p className="break-words">{this.state.description}</p>
          ) : (
            <input
              className="text-center rounded-lg border-2 py-1"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          )}
          <div className="flex items-center justify-center">
            {this.state.mode === 'edit' ? (
              <select
                className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                onChange={(e) => this.setState({ status: e.target.value })}
              >
                <option value={this.state.status} selected>
                  {this.state.status}
                </option>
                {(this.state.status === 'IN PROGRESS') != true && (
                  <option value="IN PROGRESS">IN PROGRESS</option>
                )}
                {(this.state.status === 'DONE') != true && (
                  <option value="DONE">DONE</option>
                )}
                {(this.state.status === 'NEW') != true && (
                  <option value="NEW">NEW</option>
                )}
              </select>
            ) : (
              <div >
                {this.state.status === 'IN PROGRESS' && (
                  <div className="ml-2 flex bg-blue-500 px-3 rounded-lg py-2 text-xs text-white">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>

                    <p className="">{this.state.status}</p>
                  </div>
                )}
                {this.state.status === 'DONE' && (
                  <div className="ml-2 flex bg-green-500 px-3 rounded-lg py-2 text-xs text-white">
                    <svg
                      className="w-4 mr-2"
                      viewBox="0 -1.5 11 11"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <title>done_mini [#1484]</title>{' '}
                        <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="white"
                          fillRule="evenodd"
                        >
                          {' '}
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-304.000000, -366.000000)"
                            fill="white"
                          >
                            {' '}
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              {' '}
                              <polygon
                                id="done_mini-[#1484]"
                                points="259 207.6 252.2317 214 252.2306 213.999 252.2306 214 248 210 249.6918 208.4 252.2306 210.8 257.3082 206"
                              >
                                {' '}
                              </polygon>{' '}
                            </g>{' '}
                          </g>{' '}
                        </g>{' '}
                      </g>
                    </svg>

                    <p className="">{this.state.status}</p>
                  </div>
                )}
                {this.state.status === 'NEW' && (
                  <div className="ml-2 flex bg-red-500 px-3 rounded-lg py-2 text-xs text-white">
                    <svg
                      className="w-4 mr-2"
                      viewBox="0 0 24 24"
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
                        <title />{' '}
                        <g id="Complete">
                          {' '}
                          <g id="Clock">
                            {' '}
                            <g>
                              {' '}
                              <polyline
                                fill="none"
                                points="11.9 5.9 11.9 11.9 12 12 14.1 14.1"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />{' '}
                              <circle
                                cx="12"
                                cy="12"
                                data-name="Circle"
                                fill="none"
                                id="Circle-2"
                                r="10"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />{' '}
                            </g>{' '}
                          </g>{' '}
                        </g>{' '}
                      </g>
                    </svg>

                    <p className="">{this.state.status}</p>
                  </div>
                )}
              </div>
            )}
            <div
              onClick={() => {
                if (this.state.mode === 'view') {
                  this.setState({ mode: 'edit' });
                } else {
                  this.setState({ mode: 'view' });
                  this.update();
                }
              }}
              title={this.state.mode === 'view' ? 'Edit' : 'View'}
              className="absolute -bottom-2 border-2 shadow-md  -right-2 bg-white p-2 rounded-lg  hover:scale-110"
            >
              {this.state.mode === 'view' ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-6"
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
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  className="w-6"
                  fill="#000000"
                  viewBox="-3.5 0 32 32"
                  version="1.1"
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
                    <title>view</title>{' '}
                    <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z" />{' '}
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { shell, ipcMain, dialog, app } from 'electron';

const fs = require('fs');

const init = () => {
  if (!fs.existsSync(`${app.getPath('appData')}/qplan/data`)) {
    fs.mkdirSync(`${app.getPath('appData')}/qplan/data`);
  }
  if (!fs.existsSync(`${app.getPath('appData')}/qplan/data/config.json`)) {
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/config.json`,
      '{ "github_username":""}'
    );
  }
  if (!fs.existsSync(`${app.getPath('appData')}/qplan/data/projects.json`)) {
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/projects.json`,
      '[]'
    );
  }
  if (!fs.existsSync(`${app.getPath('appData')}/qplan/data/tasks.json`)) {
    fs.writeFileSync(`${app.getPath('appData')}/qplan/data/tasks.json`, '[]');
  }
  if (!fs.existsSync(`${app.getPath('appData')}/qplan/data/labels.json`)) {
    fs.writeFileSync(`${app.getPath('appData')}/qplan/data/labels.json`, '[]');
  }
  ipcMain.handle('get:labels',async(_,...args)=>{
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/labels.json`,
      { encoding: 'utf8', flag: 'r' }
    );

    const parsed = JSON.parse(data);
    let returnData;
    parsed.forEach(element => {

      if(element.project===args[0]){
        console.log(element.labels);
        returnData = element;
      }
    });
    return returnData;
  })
  ipcMain.handle('post:labels',async(_,...args)=>{
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/labels.json`,
      { encoding: 'utf8', flag: 'r' }
    );

    const parsed = JSON.parse(data);
    let found=false;
    parsed.forEach((element,i) => {
      if(element.project===args[0]){
        parsed[i].labels.push(args[1]);
        found=true;
      }
    });
    if(found===false){
      parsed.push({"project":args[0],"labels":[args[1]]})
    }

    const newData = JSON.stringify(parsed,null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/labels.json`,
      newData
    );
  })

  ipcMain.handle('get:github', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/config.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed_github = JSON.parse(data).github_username;
    return parsed_github;
  });
  ipcMain.handle('post:github', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/config.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed_github = JSON.parse(data);
    parsed_github.github_username = args[0];
    const newData = JSON.stringify(parsed_github, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/config.json`,
      newData
    );
  });
  ipcMain.handle('add:issues', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);
    args[1].forEach((element,i) => {

      var check=false;
      for(var j=0;j<parsed.length;++j){
        if(parsed[j].name===args[1][i].title)
          check=true;
      }
      if(check===false){
        parsed.push({
          id:parsed.length>0 ? parsed[parsed.length-1].id+1 : 0,
          name: args[1][i].title,
          description: args[1][i].body,
          priority: 'HIGH',
          status: 'NEW',
          label:'UNLABELED',
          project: args[0],
        });
      }


    });


    const newData = JSON.stringify(parsed, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      newData
    );
  });
  ipcMain.handle('get:projects', async (_, args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/projects.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);

    return parsed;
  });
  ipcMain.handle('post:projects', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/projects.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);

    parsed.push({ name: args[0], description: args[1] });
    const newData = JSON.stringify(parsed, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/projects.json`,
      newData
    );
  });

  ipcMain.handle('get:tasks', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);
    let filteredData: any[] = [];
    parsed.forEach((element,i) => {
      if(element.label===args[0]){
          filteredData.push(element);
      }
    });
    return filteredData;
  });

  ipcMain.handle('post:tasks', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);

    parsed.push({
      id: parsed.length>0 ? parsed[parsed.length-1].id+1 : 0,
      name: args[0],
      description: args[1],
      priority: args[2],
      status: 'NEW',
      label:args[4],
      project: args[3],
    });

    const newData = JSON.stringify(parsed, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      newData
    );
  });

  ipcMain.handle('update:tasks', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);
    parsed.forEach(element => {
      if(element.id===args[0]){
        element.name = args[1];
        element.description = args[2];
        element.status = args[3];

      }
    });

    const newData = JSON.stringify(parsed, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      newData
    );
  });
  ipcMain.handle('delete:tasks', async (_, ...args) => {
    const data = fs.readFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      { encoding: 'utf8', flag: 'r' }
    );
    const parsed = JSON.parse(data);
    parsed.forEach((element:any,i) => {
      if(element.id===args[0]){
        parsed.splice(i,1);
      }
    });
    const newData = JSON.stringify(parsed, null, '\t');
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      newData
    );
  });

  ipcMain.handle('delete:all',async(_,...args)=>{

    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/tasks.json`,
      '[]'
    );
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/projects.json`,
      '[]'
    );
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/config.json`,
      '{"github_username": "-1"}'
    );
    fs.writeFileSync(
      `${app.getPath('appData')}/qplan/data/labels.json`,
      '[]'
    );
  })
};

export default {
  init,
};

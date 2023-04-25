import { shell, ipcMain, dialog, app } from 'electron';
const fs = require("fs");


const init = () => {

  if (!fs.existsSync((app.getPath("appData") + '/qplan/data'))) {
    fs.mkdirSync((app.getPath("appData") + '/qplan/data'));
  }
  if (!fs.existsSync((app.getPath("appData") + '/qplan/data/config.json'))) {
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/config.json', '{ "github_username":""}');
  }
  if (!fs.existsSync((app.getPath("appData") + '/qplan/data/projects.json'))) {
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/projects.json', '[]');
  }
  if (!fs.existsSync((app.getPath("appData") + '/qplan/data/tasks.json'))) {
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/tasks.json', '[]');
  }


  ipcMain.handle('get:github', async (_, ...args) => {
    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/config.json', { encoding: 'utf8', flag: 'r' });
    let parsed_github = JSON.parse(data).github_username;
    return parsed_github;
  });
  ipcMain.handle('post:github', async (_, ...args) => {

    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/config.json', { encoding: 'utf8', flag: 'r' });
    let parsed_github = JSON.parse(data);
    parsed_github.github_username = args[0];
    let newData = JSON.stringify(parsed_github, null, "\t");
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/config.json', newData);
  });



  ipcMain.handle('get:projects', async (_, args) => {
    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/projects.json', { encoding: 'utf8', flag: 'r' });
    let parsed = JSON.parse(data);

    return parsed;
  });
  ipcMain.handle('post:projects', async (_, ...args) => {
    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/projects.json', { encoding: 'utf8', flag: 'r' });
    let parsed = JSON.parse(data);

    parsed.push({ "name": args[0], "description": args[1] });
    let newData = JSON.stringify(parsed, null, "\t");
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/projects.json', newData);
  });


  ipcMain.handle('get:tasks', async (_, args) => {
    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/tasks.json', { encoding: 'utf8', flag: 'r' });
    let parsed = JSON.parse(data);

    return parsed;
  });

  ipcMain.handle('post:tasks', async (_, ...args) => {

    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/tasks.json', { encoding: 'utf8', flag: 'r' });
    let parsed = JSON.parse(data);
    parsed.push({ "name": args[0], "description": args[1], "priority": args[2], "status": "NEW", "project": args[3] });

    let newData = JSON.stringify(parsed, null, "\t");
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/tasks.json', newData);
  })

  ipcMain.handle('update:tasks', async (_, ...args) => {

    const data = fs.readFileSync(app.getPath("appData") + '/qplan/data/tasks.json', { encoding: 'utf8', flag: 'r' });
    let parsed = JSON.parse(data);
    parsed[args[0]].name = args[1];
    parsed[args[0]].description = args[2];
    parsed[args[0]].status = args[3];
    let newData = JSON.stringify(parsed, null, "\t");
    fs.writeFileSync(app.getPath("appData") + '/qplan/data/tasks.json', newData);
  })
}


export default {
  init,
};

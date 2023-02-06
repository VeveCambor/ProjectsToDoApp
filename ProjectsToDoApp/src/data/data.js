const projects = [
  { id: 1, project: 'zahrada' },
  { id: 2, project: 'TODO aplikace'},
  { id: 3, project: 'nákupy' }
]

const tasks = [
  { id: 1, task: 'natřít plot', projectid: 1, completed: 0, date: '2023-02-20', priority: 1 },
  { id: 2, task: 'posekat trávu', projectid: 1, completed: 0, date: '2023-04-28', priority: 2 },
  { id: 3, task: 'ostříhat stromky', projectid: 1, completed: 1, date: '2023-03-01', priority: 3 },
  { id: 4, task: 'seznam projektů', projectid: 2, completed: 1, date: '2023-05-02', priority: 2 },
  { id: 5, task: 'seznam úkolů', projectid: 2, completed: 1, date: '2023-01-21', priority: 2 },
  { id: 6, task: 'seznam osob', projectid: 2, completed: 0, date: '2023-02-28', priority: 1 },
  { id: 7, task: 'kafe', projectid: 3, completed: 0, date: '2023-01-15', priority: 1 },
  { id: 8, task: 'chleba', projectid: 3, completed: 0, date: '2023-01-15', priority: 1 },
  { id: 9, task: 'rohlík', projectid: 3, completed: 0, date: '2023-01-15', priority: 1 },
]

export const getProjects = function () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(projects)
    }, 200)
  })
}

export const getTasks = function () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tasks)
    }, 200)
  })
}
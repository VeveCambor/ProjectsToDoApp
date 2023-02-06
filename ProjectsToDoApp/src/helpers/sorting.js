export const sortingTasks = (a, b) => {
  if (a.completed !== b.completed) {
    return a.completed - b.completed
  }
  if (a.date !== b.date) {
    return a.date.localeCompare(b.date)
  }
  return a.task.localeCompare(b.task)
}

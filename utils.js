const validateTask = (task) => {
  if (!task.type) {
    throw new Error('Task type is required');
  }

  switch (task.type) {
    case 'navigate':
      if (!task.url) {
        throw new Error('URL is required for navigate task');
      }
      break;
    case 'click':
    case 'scrape':
      if (!task.selector) {
        throw new Error('Selector is required for click and scrape tasks');
      }
      break;
    case 'fillForm':
      if (!task.selector || !task.data) {
        throw new Error('Selector and data are required for fillForm task');
      }
      break;
    default:
      throw new Error(`Unknown task type: ${task.type}`);
  }
};

const validateTasks = (tasks) => {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks should be an array');
  }

  tasks.forEach(validateTask);
};

module.exports = {
  validateTask,
  validateTasks,
};

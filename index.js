import {
  add, edit, remove, read, editOneElement,
} from './jsonFileStorage.js';
import getDateNow from './date.js';

if (process.argv[2] === 'show') {
  read('data.json', (err, data) => {
    if (!err) {
      console.log('To-Do:');
      const items = data.items.filter(
        (item) => (item.completed === null) && (item.removed === null),
      );
      for (let i = 0; i < items.length; i += 1) {
        console.log(`${i + 1}. ${items[i].task} (added: ${items[i].added})`);
      }

      console.log('\nDone:');
      const doneItems = data.items.filter(
        (item) => (item.completed !== null),
      );
      for (let j = 0; j < doneItems.length; j += 1) {
        console.log(`${j + 1}. ${doneItems[j].task} (completed: ${doneItems[j].completed})`);
      }
    }
  });
} else if (process.argv[2] === 'add') {
  const newItem = process.argv[3];
  const newTask = {
    task: newItem,
    added: getDateNow(),
    completed: null,
    removed: null,
  };

  add('data.json', 'items', newTask, (err) => {
    if (!err) {
      console.log(`I have added "${newItem}" to your to-do list.`);
    }
  });
} else if (process.argv[2] === 'complete') {
  const index = parseInt(process.argv[3], 10);

  edit('data.json', (err, data) => {
    if (!err) {
      const items = data.items.filter(
        (item) => (item.completed === null) && (item.removed === null),
      );

      items[index - 1].completed = getDateNow();
    }
  }, (err) => {
    if (!err) {
      console.log(`I have marked item ${index}, "?" as complete.`);
    }
  });
} else if (process.argv[2] === 'remove') {
  const index = process.argv[3];

  remove('data.json', 'items', index, (err) => {
    if (!err) {
      console.log(`I have removed item ${index}, "?".`);
    }
  });
} else if (process.argv[2] === 'edit') {
  const index = process.argv[3];
  const newItem = process.argv[4];
  const newTask = {
    task: newItem,
    added: getDateNow(),
    completed: null,
    removed: null,
  };

  editOneElement('data.json', 'items', index, newTask, (err) => {
    if (!err) {
      console.log(`I have edited item ${index}, "?" to be "${newItem}".`);
    }
  });
}

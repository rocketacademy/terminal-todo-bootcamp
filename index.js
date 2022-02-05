import {
  read, add, edit, remove, editOneElement,
} from './jsonFileStorage.js';

const command = process.argv[2];

const showList = () => {
  // read(filename, callback)
  // callback(null, jsonContentObj);

  read('data.json', (readErr, jsonContentObj) => {
    if (readErr) {
      console.error('Read error', readErr);
      return;
    }

    // define to do list items
    const toDoList = jsonContentObj['To Do'];

    console.log('To-Do-List:');
    // console log to do list items
    toDoList.forEach((element, index) => console.log(`${index + 1}: ${element}`));

    const completedList = jsonContentObj.Done;
    console.log('Done:');
    completedList.forEach((element, index) => console.log(`${index + 1}: ${element}`));
  });
};

const addItem = () => {
  // add(filename, key, input, writeCallback)
  // writeCallback(null, jsonContentStr);
  const input = process.argv[3];
  add('data.json', 'To Do', input, (writeErr) => {
    if (writeErr) {
      console.error('Write error', writeErr);
    }
    if (!writeErr) {
      console.log(`You added "${input}" to your To-Do-List!`);
    }
  });
};

const showCompleted = () => {
  const input = process.argv[3];
  // edit(filename, readCallback, writeCallback)
  edit('data.json', (readErr, jsonContentObj) => {
    if (readErr) {
      console.error('Read error', readErr);
      return;
    }

    // define to do list items
    const toDoList = jsonContentObj['To Do'];
    // console log to do list items
    for (let i = 0; i < toDoList.length; i += 1) {
      if (input - 1 === i) {
        const completedItem = toDoList.splice(i, 1);
        jsonContentObj.Done.push(completedItem.toString());
        console.log(`You have marked item ${input}, "${completedItem}" as complete.`);

        console.log('To-Do-List:');
        // console log to do list items
        toDoList.forEach((element, index) => console.log(`${index + 1}: ${element}`));
      }
    }
  }, (writeErr, jsonContentStr) => {
    // writeCallback(null, jsonContentStr);
    if (writeErr) {
      console.error('Write error', writeErr);
    }
    const jsonContentObj = JSON.parse(jsonContentStr);
    // define completed items
    const completedItems = jsonContentObj.Done;
    console.log('Done:');
    // console log to do list items
    completedItems.forEach((element, index) => console.log(`${index + 1}: ${element}`));
  });
};

const removeItem = () => {
  // remove(filename, key, input, callback)
  const input = process.argv[3];
  remove('data.json', 'To Do', input, (writeErr) => {
    if (writeErr) {
      console.error('Write error', writeErr);
    }
    showList();
  });
};

const editOneItem = () => {
  const index = process.argv[3];
  const replacement = process.argv[4];
  editOneElement('data.json', 'To Do', index, replacement,
    (writeErr) => {
      if (writeErr) {
        console.error('Write error', writeErr);
      }
      showList();
    });
};

if (command === 'show') {
  showList();
} else if (command === 'add') {
  addItem();
} else if (command === 'complete') {
  showCompleted();
} else if (command === 'remove') {
  removeItem();
} else if (command === 'edit') {
  editOneItem();
}

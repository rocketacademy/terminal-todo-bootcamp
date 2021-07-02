import { read, add } from './jsonFileStorage.js';

// jsonContent is a JavaScript object. Not a string.
const whenJsonIsRead = (jsonContent) => {
  // access the key and make a new variable for readability
  const { items } = jsonContent;

  if (process.argv[2] === 'show') {
    for (let i = 0; i < items.length; i += 1) {
      console.log(`- ${items[i]}`);
    }
  }
};

read('data.json', whenJsonIsRead);

if (process.argv[2] === 'add') {
  add('data.json', 'items', process.argv[3], whenJsonIsRead);
  console.log(`I have added ${process.argv[3]} to your to-do list`);
}

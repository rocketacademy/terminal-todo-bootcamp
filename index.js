import { add, read, complete, edit } from './jsonFileStorage.js';

const file = process.argv[2];
const command = process.argv[3];

// node index.js data.json show
if (command === 'show') {
  const handleFileRead = (err, content) => {
    const { items } = content;
    const { done } = content;
    if (!err) {
      let output = '';
      output += `To-Do:\n`;
      for (let i = 0; i < items.length; i += 1) {
        output += `${i + 1}. ${items[i]}\n`;
      }
      if (!content['done']) {
        null;
      } else {
        output += `\nDone:\n`;
        for (let i = 0; i < done.length; i += 1) {
          output += `${i + 1}. ${done[i]}\n`;
        }
      }
      console.log(output);
    }
  };
  read(file, handleFileRead);
}

// node index.js data.json add items hello
if (command === 'add') {
  const key = process.argv[4];
  const input = process.argv[5];
  add(file, key, input, (err) => {
    if (!err) {
      console.log('done');
    }
  });
}

if (command === 'complete') {
  const number = process.argv[4] - 1;
  complete(file, number, (err) => {
    if (err) {
      console.log('edit error', err);
      return;
    }
  });
}

import { readFile, writeFile } from 'fs';

export const read = (file, callback) => {
  const handleFileRead = (err, jsonContentStr) => {
    if (err) {
      console.log('read error', err);
      callback(err, null);
      return;
    }
    // take contents from file and convert to obj
    const jsonContentObj = JSON.parse(jsonContentStr);
    callback(null, jsonContentObj);
  };

  readFile(file, 'utf8', handleFileRead);
};

export const write = (file, jsonContentObj, callback) => {
  // convert obj to str
  const jsonContentStr = JSON.stringify(jsonContentObj);

  // writes jsonContentStr to file
  writeFile(file, jsonContentStr, (err) => {
    if (err) {
      callback(err, null);
      console.log('write err', err);
      return;
    }
    console.log('Write success');
    callback(null, jsonContentStr);
  });
};

export const edit = (file, readCallBack, writeCallBack) => {
  read(file, (err, jsonContentObj) => {
    if (err) {
      console.log('read error', err);
      readCallBack(err, null);
      return;
    }
    // custom edit operations here
    readCallBack(null, jsonContentObj);
    // write updated content to file
    write(file, jsonContentObj, writeCallBack);
  });
};

export const add = (file, key, input, callback) => {
  edit(
    file,
    (err, jsonContentObj) => {
      if (err) {
        console.log('edit error', err);
        callback(err);
        return;
      }
      if (!key in jsonContentObj) {
        console.log('key does not exist');
        callback('key does not exist');
        return;
      }
      // input element into target array
      jsonContentObj[key].push(input);
    },
    callback
  );
};

export const complete = (file, number, callback) => {
  edit(
    file,
    (err, jsonContentObj) => {
      if (err) {
        console.log('edit error', err);
        return;
      }
      let selectedItem;
      // iterates over the values in object "items"
      for (const items of Object.values(jsonContentObj)) {
        // select item specified as "done"
        let checkItem = items[number];
        // if item is undefined, don't add into var
        if (checkItem !== undefined) {
          selectedItem = checkItem;
        }
      }
      // if key "done" is not found, add the key
      if (!jsonContentObj['done']) {
        console.log('"Done" key not found, adding it in...');
        // push selected item into "done" key as an array
        jsonContentObj['done'] = [selectedItem];
      } else {
        jsonContentObj['done'].push(selectedItem);
      }
      // remove selected item from "todo" list
      jsonContentObj['items'].splice(number, 1);
    },
    callback
  );
};

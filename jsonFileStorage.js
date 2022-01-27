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

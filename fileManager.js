import { readFile, writeFile } from "fs";

/**
 *
 * @param {string} readPath
 * @param {function} readOkCb callback on read ok
 * @param {function} readErrCb callback on read error
 */
export const view = (readPath, readOkCb, readErrCb) => {
  readFile(readPath, (err, content) => {
    if (err) {
      return readErrCb(err);
    }
    const json = JSON.parse(content);
    readOkCb(json);
  });
};

/**
 *
 * @param {string} readPath
 * @param {function} readOkCb callback on read ok
 * @param {function} readErrCb callback on read error
 * @param {string} writePath
 * @param {function} writeErrCb callback on write error
 */
export const edit = (readPath, readOkCb, readErrCb, writePath, writeErrCb) => {
  readFile(readPath, (err, content) => {
    if (err) {
      console.log("[edit] read error");
      return readErrCb(err);
    }
    const json = JSON.parse(content);
    const jsonNew = readOkCb(json);

    const newContent = JSON.stringify(jsonNew);
    writeFile(writePath, newContent, (err) => {
      return err && writeErrCb(err);
    });
  });
};

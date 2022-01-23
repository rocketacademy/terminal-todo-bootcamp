import { readFile, writeFile } from "fs";

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {object} jsonContentObj - The content to write to the JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes write error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function write(filename, jsonContentObj, callback) {
  // Convert content object to string before writing
  const jsonContentStr = JSON.stringify(jsonContentObj);

  // Write content to DB
  writeFile(filename, jsonContentStr, (writeErr) => {
    if (writeErr) {
      console.error("Write error", jsonContentStr, writeErr);
      // Allow each client app to handle errors in their own way
      callback(writeErr, null);
      return;
    }

    // Call client-provided callback on successful write
    callback(null, jsonContentStr);
    //console.log("Write success!");
  });
}

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes read error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function read(filename, callback) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error("Read error", readErr);
      // Allow client to handle error in their own way
      callback(readErr, null);
      return;
    }

    // Convert file content to JS Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Call client callback on file content
    callback(null, jsonContentObj);
  };

  // Read content from DB
  readFile(filename, "utf-8", handleFileRead);
}

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes read error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function edit(filename, readCallback, writeCallback) {
  // Read contents of target file and perform callback on JSON contents
  read(filename, (readErr, jsonContentObj) => {
    // Exit if there was a read error
    if (readErr) {
      console.error("Read error", readErr);
      readCallback(readErr, null);
      return;
    }

    // Perform custom edit operations here.
    // jsonContentObj mutated in-place because object is mutable data type.
    readCallback(null, jsonContentObj);

    // Write updated content to target file.
    write(filename, jsonContentObj, writeCallback);
  });
}

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {string} key - The key in the JSON file whose value is the target array
 * @param {string} key2 - The key in the JSON file whose value is the target array
 * @param {string} input - The value to append to the target array
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes read or write error as 1st param and written string as 2nd param.
 * @returns undefined
 */
export function add(filename, key, key2, input, callback) {
  edit(
    filename,
    (err, jsonContentObj) => {
      // Exit if there was an error
      if (err) {
        console.error("Edit error", err);
        callback(err);
        return;
      }

      // Exit if key does not exist in DB
      if (!(key in jsonContentObj)) {
        console.error("Key does not exist");
        // Call callback with relevant error message to let client handle
        callback("Key does not exist");
        return;
      }

      if (input !== undefined) {
        // Add input element to target array
        jsonContentObj[key][key2].push(input);
      }
    },
    // Pass callback to edit to be called after edit completion
    callback
  );
}

/**
 * Remove an element from an array in JSON
 * @param {string} filename
 * @param {string} key - The name of the key of the array we wish to edit
 * @param {string} key2 - The key in the JSON file whose value is the target array
 * @param {number} index - The index of the array we wish to delete from
 * @param {function} callback - The callback function to call after removing
 * @returns undefined
 */
export function remove(filename, key, key2, index, callback) {
  edit(
    filename,
    (err, jsonContentObj) => {
      // Exit if there was an error
      if (err) {
        console.error("Edit error", err);
        callback(err);
        return;
      }

      // Exit if key does not exist in DB
      if (!(key in jsonContentObj)) {
        console.error("Key does not exist");
        // Call callback with relevant error message to let client handle
        callback("Key does not exist");
        return;
      }

      if (
        index !== undefined &&
        typeof (Number(index) === "number") &&
        Number(index) > 0
      ) {
        // Delete index element to target array
        jsonContentObj[key][key2].splice(Number(index) - 1, 1);
      }
    },
    // Pass callback to edit to be called after edit completion
    callback
  );
}

/**
 * Remove an element from an array in JSON
 * @param {string} filename
 * @param {string} key - The name of the key of the array we wish to edit
 * @param {string} key2 - The key in the JSON file whose value is the target array
 * @param {string} key3 - The key in the JSON file whose value is the target array
 * @param {number} index - The index of the array we wish to delete from and add to
 * @param {function} callback - The callback function to call after removing
 * @returns undefined
 */
export function complete(filename, key, key2, key3, index, callback) {
  edit(
    filename,
    (err, jsonContentObj) => {
      // Exit if there was an error
      if (err) {
        console.error("Edit error", err);
        callback(err);
        return;
      }

      // Exit if key does not exist in DB
      if (!(key in jsonContentObj)) {
        console.error("Key does not exist");
        // Call callback with relevant error message to let client handle
        callback("Key does not exist");
        return;
      }

      if (
        index !== undefined &&
        typeof (Number(index) === "number") &&
        Number(index) > 0
      ) {
        // Add index element to target array
        jsonContentObj[key][key3].push(
          jsonContentObj[key][key2][Number(index) - 1]
        );
        // Delete index element to target array
        jsonContentObj[key][key2].splice(Number(index) - 1, 1);
      }
    },
    // Pass callback to edit to be called after edit completion
    callback
  );
}

/**
 * Remove an element from an array in JSON
 * @param {string} filename
 * @param {string} key - The name of the key of the array we wish to edit
 * @param {string} key2 - The key in the JSON file whose value is the target array
 * @param {number} index - The index of the array we wish to delete from and add to
 * @param {string} input - The value to append to the target array
 * @param {function} callback - The callback function to call after removing
 * @returns undefined
 */
export function update(filename, key, key2, index, input, callback) {
  edit(
    filename,
    (err, jsonContentObj) => {
      // Exit if there was an error
      if (err) {
        console.error("Edit error", err);
        callback(err);
        return;
      }

      // Exit if key does not exist in DB
      if (!(key in jsonContentObj)) {
        console.error("Key does not exist");
        // Call callback with relevant error message to let client handle
        callback("Key does not exist");
        return;
      }

      if (
        index !== undefined &&
        typeof (Number(index) === "number") &&
        Number(index) > 0
      ) {
        console.log(
          `Replaced ${
            jsonContentObj[key][key2][Number(index) - 1]
          } with ${input}`
        );
        // Replace value of target array
        jsonContentObj[key][key2][Number(index) - 1] = input;
      }
    },
    // Pass callback to edit to be called after edit completion
    callback
  );
}

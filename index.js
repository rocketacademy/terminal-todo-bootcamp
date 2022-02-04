import { add, edit, read, remove, editOneElement } from "./jsonFileStorage.js";

/**
 * moves an item from one array of the JSON object to the end of another array
 * @param {string} filename
 * @param {string} sourceKey - The name of the key of the array we wish to take the task from
 * @param {number} sourceArrayIndex - The index of the array we wish to edit
 * @param {string} targetKey - The name of the key of the array we wish to push the task to
 * @param {function} callback
 */
const complete = function (
  filename,
  sourceKey,
  sourceArrayIndex,
  targetKey,
  callback
) {
  let movedTaskString;
  edit(
    filename,
    (readErr, jsonContentObj) => {
      // console.log(readErr);
      if (!readErr) {
        movedTaskString = jsonContentObj[sourceKey][sourceArrayIndex];

        // push task to completedItems array
        jsonContentObj[targetKey].push(movedTaskString);
        console.log(`${targetKey} contains: ${jsonContentObj[targetKey]}`);

        // remove task from original array
        if (sourceArrayIndex > -1) {
          jsonContentObj[sourceKey].splice(sourceArrayIndex, 1);
        }
      }
    },
    callback
  );
};

// If the user specifies add functionality
const command = process.argv[2];
const userIndex = process.argv[3];
const internalIndex = userIndex - 1;
if (command === "show") {
  read("data.json", (err, data) => {
    console.log(err);
    if (!err) {
      const tasks = data["items"];
      console.log("To-Do:");
      for (let i = 0; i < tasks.length; i += 1) {
        console.log(`${i + 1} - ${tasks[i]}`);
      }
      const completed = data["completedItems"];
      console.log("\nDone:");
      for (let i = 0; i < completed.length; i += 1) {
        console.log(`${i + 1} - ${completed[i]}`);
      }
    }
  });
} else if (command === "add") {
  add("data.json", "items", internalIndex, (err) => {
    console.log(err);
    if (!err) {
      console.log(`I have added ${process.argv[3]} to your to-do list`);
    }
  });
} else if (command === "complete") {
  complete("data.json", "items", internalIndex, "completedItems", () => {});
} else if (command === "remove") {
  remove("data.json", "items", internalIndex);
} else if (command === "edit") {
  editOneElement("data.json", "items", internalIndex, process.argv[4]);
}

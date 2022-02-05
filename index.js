import { read, add, edit } from "./jsonFileStorage.js";

let indexOfItem = process.argv[3];
let key = "To-Do";
let newKey = "Done";
const filename = "data.json";

if (process.argv[2] === "show") {
  let key = "To-Do";
  let newKey = "Done";
  read(filename, (err, jsonContentObj) => {
    if (!err) {
      let list = jsonContentObj[key];
      console.log("To-Do:");
      for (let i = 1; i < list.length; i += 1) {
        console.log(`${i}. ${list[i]}`);
      }
      console.log("\n");
      console.log("Done:");
      let newlist = jsonContentObj[newKey];
      for (let j = 1; j < newlist.length; j += 1) {
        console.log(`${j}. ${newlist[j]}`);
      }
    }
  });
}

if (process.argv[2] === "add") {
  let callback = (err, object) => {
    if (!err) {
      console.log(`I have added "${indexOfItem}" to the list.`);
    }
  };
  add(filename, newKey, indexOfItem, callback);
}

if (process.argv[2] === "complete") {
  edit(`data.json`, (err, jsonContentObj) => {
    let itemCompleted = jsonContentObj[key].splice(indexOfItem, 1);
    if (!err) {
      jsonContentObj[newKey].push(itemCompleted[0]);
      console.log(
        `I have marked item ${indexOfItem}, ${itemCompleted} as complete.`
      );
    }
  });
}

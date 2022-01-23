import { add, remove, read, complete, update } from "./jsonFileStorage.js";

let action = process.argv[2];
let userInput = process.argv[3];
let userInput2 = process.argv[4];
let utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

const handleJsonRead = (err, jsonContentObj) => {
  const { items } = jsonContentObj;
  // If no error, edit the content
  if (!err) {
    console.log(`To do:`);
    items["Todo"].forEach(function (value, i) {
      console.log("%d: %s", i + 1, value);
    });
    console.log(`Done:`);
    items["Done"].forEach(function (value, i) {
      console.log("%d: %s", i + 1, value);
    });
  }
};

const handleJsonWrite = (err) => {
  if (action === "add") {
    if (!err && userInput !== undefined) {
      console.log(`I have added ${userInput} to your to-do list`);
    } else {
      console.log(`Please input the item you wish to add`);
    }
  }
  console.log(`Write success on ${utc}`);
};

const nextFunction = () => read("data.json", handleJsonRead);
switch (action) {
  case "show":
    nextFunction();
    break;
  case "add":
    add("data.json", "items", "Todo", userInput, handleJsonWrite);
    break;
  case "complete":
    complete("data.json", "items", "Todo", "Done", userInput, handleJsonWrite);
    setTimeout(nextFunction, 100);
    break;
  case "remove":
    remove("data.json", "items", "Todo", userInput, handleJsonWrite);
    setTimeout(nextFunction, 100);
    break;
  case "edit":
    update(
      "data.json",
      "items",
      "Todo",
      userInput,
      userInput2,
      handleJsonWrite
    );
    setTimeout(nextFunction, 100);
    break;
}

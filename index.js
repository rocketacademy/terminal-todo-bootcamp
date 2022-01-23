import { add, write, read, edit } from "./jsonFileStorage.js";

let action = process.argv[2];
let userInput = process.argv[3];

const handleJsonRead = (err, jsonContentObj) => {
  const { items } = jsonContentObj;
  if (action === "complete") {
    if (
      !err &&
      userInput !== undefined &&
      typeof (Number(userInput) === "number") &&
      Number(userInput) > 0
    ) {
      const index = Number(userInput);
      if (index > 0) {
        items["Done"].push(items["Todo"][index - 1]);
        items["Todo"].splice(index - 1, 1);
      }
    } else {
      console.log(`Please input a number greater than 1`);
    }
  }

  if (action === "show" || action === "complete") {
    {
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
    }
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
};

switch (action) {
  case "show":
    read("data.json", handleJsonRead);
    break;
  case "add":
    add("data.json", "items", "Todo", userInput, handleJsonWrite);
    break;
  case "complete":
    edit("data.json", handleJsonRead, handleJsonWrite);
}

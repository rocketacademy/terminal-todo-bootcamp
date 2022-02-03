import { add, read, remove, editOneElement, edit } from "./jsonFileStorage.js";

const filename = "public/data.json";

export const toDoListHandler = (action, newItem, editedItem) => {
  let idx;
  switch (action) {
    case "show":
      read(filename, showItemsCallback);
      return;
    case "add":
      add(filename, "items", newItem, handleErrorCallback);
      console.log(`I have added "${newItem}" to your to-do list`);
      return;
    case "complete":
      idx = parseInt(newItem) - 1; // idx to pop -1
      if (idx < 0) {
        console.error(`[ERROR] invalid number in todolist: ${idx}`);
      }

      add(filename, "done", idx, handleErrorCallback);
      return;
    case "remove":
      idx = parseInt(newItem) - 1;
      if (idx < 0) {
        console.error(`[ERROR] invalid number in todolist: ${idx}`);
      }

      remove(filename, "items", idx, handleErrorCallback);
      return;
    case "edit":
      idx = parseInt(newItem) - 1;
      if (idx < 0) {
        console.error(`[ERROR] invalid number in todolist: ${idx}`);
      }

      editOneElement(filename, "items", idx, editedItem, handleErrorCallback);
      return;
    default:
      console.error(
        `[ERROR] invalid action: ${action}, supported actions: add, show`
      );
      return;
  }
};

const showItemsCallback = (readErr, contentObj) => {
  if (readErr) {
    console.error("[ERROR] read error: ", readErr);
    return;
  }

  const items = contentObj.items;
  const completed = contentObj.done;

  console.log("To-Do: \n--------");
  for (let i = 0; i < items.length; i++) {
    console.log(`${i + 1}. ${items[i]}`);
  }

  console.log("\nDone: \n--------");
  for (let i = 0; i < completed.length; i++) {
    console.log(`${i + 1}. ${completed[i]}`);
  }

  return;
};

const handleErrorCallback = (err) => {
  // handle error only
  if (err) {
    console.error(`[ERROR] error in handleErrorCallback ${err}`);
    return;
  }

  return;
};

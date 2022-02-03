import { toDoListHandler } from "./todolist.js";
const main = () => {
  const args = process.argv.slice(2);

  switch (true) {
    case args.length < 1:
      console.log(
        "Specify 1 arg for action (show/add) - Example: node scripts/index.js read"
      );
      return;
    case args.length > 3:
      console.log(
        "Too many actions! Example: node scripts/index.js add new-todo-item"
      );
      return;
    default:
      const action = args[0];
      const newItem = args[1] === undefined ? null : args[1];
      const editedItem = args[2] === undefined ? null : args[2];
      // process to do list actions
      toDoListHandler(action, newItem, editedItem);
  }
};

main();

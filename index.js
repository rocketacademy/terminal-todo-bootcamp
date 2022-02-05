import { read, edit, remove } from "./jsonFileStorage.js";

const action = process.argv[2];
const item = process.argv[3];
const newItem = process.argv[4];

switch (action) {
  case "show":
    read("data.json", (err, jsonContentObj) => {
      // Exit if there was a read error
      if (err) {
        console.error("Read error", err);
        return;
      }

      const items = jsonContentObj.items;

      const toDo = items.filter((item) => !item.done);
      const done = items.filter((item) => item.done);

      console.log(`To-Do:`);
      for (let i = 0; i < toDo.length; i += 1) {
        console.log(`${i + 1}. ${toDo[i].item} - ${toDo[i].date}`);
      }
      console.log(``);
      console.log(`Done:`);
      for (let i = 0; i < done.length; i += 1) {
        console.log(`${i + 1}. ${done[i].item} - ${done[i].date}`);
      }
    });
    break;
  case "complete":
    let completedItem = "";

    edit(
      "data.json",
      (err, jsonContentObj) => {
        // If no error, edit the content
        if (!err) {
          // loop through items that are not done yet
          // and find the item to mark complete

          const items = jsonContentObj["items"];
          let itemNotDoneCounter = 1;

          for (let i = 0; i < items.length; i += 1) {
            if (items[i].done === false) {
              if (parseInt(item) === itemNotDoneCounter) {
                items[i].done = true;
                completedItem = items[i].item;
                break;
              } else {
                itemNotDoneCounter += 1;
              }
            }
          }

          jsonContentObj["items"] = items;
        }
      },
      (err, jsonContentStr) => {
        if (!err) {
          console.log(
            `I have marked item ${item}, "${completedItem}" as complete.`
          );

          const itemsObject = JSON.parse(jsonContentStr);

          const items = itemsObject.items;

          const toDo = items.filter((item) => !item.done);
          const done = items.filter((item) => item.done);

          console.log(`To-Do:`);
          for (let i = 0; i < toDo.length; i += 1) {
            console.log(`${i + 1}. ${toDo[i].item} - ${toDo[i].date}`);
          }
          console.log(``);
          console.log(`Done:`);
          for (let i = 0; i < done.length; i += 1) {
            console.log(`${i + 1}. ${done[i].item} - ${done[i].date}`);
          }
        }
      }
    );
    break;
  case "add":
    edit(
      "data.json",
      (err, jsonContentObj) => {
        // If no error, edit the content
        if (!err) {
          const items = jsonContentObj.items;

          const date = new Date();

          const newItem = {
            id: items.length + 1,
            item: item,
            done: false,
            date: date.toDateString() + " " + date.toLocaleTimeString("en-SG"),
          };

          items.push(newItem);

          jsonContentObj["items"] = items;
        }
      },
      (err, jsonContentStr) => {
        if (!err) {
          console.log(`I have added ${item} to your to-do list.`);

          const itemsObject = JSON.parse(jsonContentStr);

          const items = itemsObject.items;

          const toDo = items.filter((item) => !item.done);
          const done = items.filter((item) => item.done);

          console.log(`To-Do:`);
          for (let i = 0; i < toDo.length; i += 1) {
            console.log(`${i + 1}. ${toDo[i].item} - ${toDo[i].date}`);
          }
          console.log(``);
          console.log(`Done:`);
          for (let i = 0; i < done.length; i += 1) {
            console.log(`${i + 1}. ${done[i].item} - ${done[i].date}`);
          }
        }
      }
    );
    break;
  case "remove":
    let removedItem = "";
    read("data.json", (err, jsonContentObj) => {
      // Exit if there was a read error
      if (err) {
        console.error("Read error", err);
        return;
      }

      const items = jsonContentObj.items;
      let removeCounter = 0;
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].done === false) {
          removeCounter += 1;
        }

        if (removeCounter === parseInt(item)) {
          removedItem = items[i].item;
          break;
        }
      }
    });

    remove("data.json", "items", parseInt(item), (err, jsonContentStr) => {
      if (!err) {
        console.log(`I have removed Item ${item}, "${removedItem}".`);

        const items = JSON.parse(jsonContentStr).items;

        const toDo = items.filter((item) => !item.done);
        const done = items.filter((item) => item.done);

        console.log(`To-Do:`);
        for (let i = 0; i < toDo.length; i += 1) {
          console.log(`${i + 1}. ${toDo[i].item} - ${toDo[i].date}`);
        }
        console.log(``);
        console.log(`Done:`);
        for (let i = 0; i < done.length; i += 1) {
          console.log(`${i + 1}. ${done[i].item} - ${done[i].date}`);
        }
      }
    });

    break;
  case "edit":
    let oldItem = "";

    edit(
      "data.json",
      (err, jsonContentObj) => {
        // If no error, edit the content
        if (!err) {
          const items = jsonContentObj.items;

          let removeCounter = 0;
          for (let i = 0; i < items.length; i += 1) {
            if (items[i].done === false) {
              removeCounter += 1;
            }

            if (removeCounter === parseInt(item)) {
              oldItem = jsonContentObj.items[i].item;
              jsonContentObj.items[i].item = newItem;
              break;
            }
          }
        }
      },
      (err, jsonContentStr) => {
        if (!err) {
          console.log(
            `I have edited Item ${item}, "${oldItem}" to be "${newItem}";`
          );

          const itemsObject = JSON.parse(jsonContentStr);

          const items = itemsObject.items;

          const toDo = items.filter((item) => !item.done);
          const done = items.filter((item) => item.done);

          console.log(`To-Do:`);
          for (let i = 0; i < toDo.length; i += 1) {
            console.log(`${i + 1}. ${toDo[i].item} - ${toDo[i].date}`);
          }
          console.log(``);
          console.log(`Done:`);
          for (let i = 0; i < done.length; i += 1) {
            console.log(`${i + 1}. ${done[i].item} - ${done[i].date}`);
          }
        }
      }
    );
    break;
}

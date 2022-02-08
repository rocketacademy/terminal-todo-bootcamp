import { edit, view } from "./fileManager.js";
import {
  getCallbackItemAdd,
  getCallbackItemComplete,
  getCallbackItemRemove,
  getCallbackItemEditOne,
} from "./callbackGenerators.js";

const PATH_DATA = "data.json";
const COMMAND_ADD = "add";
const COMMAND_COMPLETE = "complete";
const COMMAND_REMOVE = "remove";
const COMMAND_EDIT_ONE = "edit";
const COMMAND_SHOW = "show";

const [ssss, ss, command, arg0, arg1] = process.argv;

// Custom Edit/View Methods

/**
 *
 * @param {string} commonPath Path to read and write.
 * @param {function(Error):void} commonErrCb Error callback for both read and write operations.
 * @returns {function(Data):Data}
 */
const getDefaultExecutorFile = (commonPath, commonErrCb) => {
  return (onReadOkCb) =>
    edit(commonPath, onReadOkCb, commonErrCb, commonPath, commonErrCb);
};
const defaultExecutorToDos = getDefaultExecutorFile(PATH_DATA, (err) => {
  console.log("Error occurred" + err);
});

const getDefaultViewFile = (readPath, okCb, errCb) => {
  return () => view(readPath, okCb, errCb);
};

const defaultViewToDo = getDefaultViewFile(PATH_DATA, console.log, (err) =>
  console.log("Error reading... " + err)
);

switch (command) {
  case COMMAND_ADD:
    const itemDesc = arg0;
    defaultExecutorToDos(getCallbackItemAdd(itemDesc));
    break;
  case COMMAND_COMPLETE:
    const itemIndexDone = Number(arg0) - 1;
    defaultExecutorToDos(getCallbackItemComplete(itemIndexDone));
    break;
  case COMMAND_REMOVE:
    const itemIndexRemove = Number(arg0) - 1;
    defaultExecutorToDos(getCallbackItemRemove(itemIndexRemove));
    break;
  case COMMAND_EDIT_ONE:
    const itemDescRevised = arg1;
    const itemIndexRevised = Number(arg0) - 1;
    defaultExecutorToDos(
      getCallbackItemEditOne(itemIndexRevised, itemDescRevised)
    );
    break;
  case COMMAND_SHOW:
    defaultViewToDo();
  default:
    break;
}

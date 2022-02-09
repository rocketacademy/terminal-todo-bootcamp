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

const [_, __, command, arg0, arg1] = process.argv;

// Custom Edit/View Methods

const readPath = PATH_DATA;
const writePath = PATH_DATA;
const defaultReadErrorCb = console.log;
const defaultWriteErrorCb = console.log;
const execute = (onReadOkCb) =>
  edit(
    readPath,
    onReadOkCb,
    defaultReadErrorCb,
    writePath,
    defaultWriteErrorCb
  );

switch (command) {
  case COMMAND_ADD:
    const itemDesc = arg0;
    execute(getCallbackItemAdd(itemDesc));
    break;
  case COMMAND_COMPLETE:
    const itemIndexDone = Number(arg0) - 1;
    execute(getCallbackItemComplete(itemIndexDone));
    break;
  case COMMAND_REMOVE:
    const itemIndexRemove = Number(arg0) - 1;
    execute(getCallbackItemRemove(itemIndexRemove));
    break;
  case COMMAND_EDIT_ONE:
    const itemDescRevised = arg1;
    const itemIndexRevised = Number(arg0) - 1;
    execute(getCallbackItemEditOne(itemIndexRevised, itemDescRevised));
    break;
  case COMMAND_SHOW:
    view(readPath, console.log, (err) => console.log("error! ", err));
  default:
    break;
}

// Callback generators

/**
 * Add a task.
 * @param {string} itemDesc Item description of task to add.
 * @returns {function(Data):Data}
 */
export const getCallbackItemAdd = (itemDesc) => {
  const item = { desc: itemDesc, dateAdded: Date().toString(), done: false };
  return (json) => {
    const itemsInData = json["items"] ?? [];
    json.items = [...itemsInData, item];
    return { ...json };
  };
};
/**
 *
 * Callback to flag a task as complete.
 * @param {number} itemIndex Zero index based item position
 * @returns {function(Data):Data}
 */
export const getCallbackItemComplete = (itemIndex) => {
  return (json) => {
    const items = json.items.map((item, index) => {
      if (index === itemIndex) {
        return { ...item, done: true, dateCompleted: Date().toString() };
      }
      return { ...item };
    });
    return { ...json, items };
  };
};
/**
 * Callback to remove a task.
 * @param {number} itemIndex Zero index based item position
 * @returns {function(Data):Data}
 */
export const getCallbackItemRemove = (itemIndex) => {
  return (json) => {
    const items = json.items.filter((item, index) => {
      return index !== itemIndex;
    });
    return { ...json, items };
  };
};
/**
 * Overwrite description of a task.
 * @param {number} itemIndex Zero index based item position
 * @param {string} newDesc The new description of task.
 * @returns {function(Data):Data}
 */
export const getCallbackItemEditOne = (itemIndex, newDesc) => {
  return (json) => {
    const items = json.items.map((item, index) => {
      if (index === itemIndex) {
        return { ...item, desc: newDesc };
      }
      return { ...item };
    });
    return { ...json, items };
  };
};

/**
 *
 * @param {string} readPath Path to read and write.
 * @param {function(Data):void} okCb Error callback for both read and write operations.
 * @param {function(Error):void} errCb Error callback for both read and write operations.
 * @returns {function}
 */
export const getDefaultViewFile = (readPath, okCb, errCb) => {
  return () => view(readPath, okCb, errCb);
};

/**
 *
 * @param {string} commonPath Path to read and write.
 * @param {function(Error):void} commonErrCb Error callback for both read and write operations.
 * @returns {function(function(Data):Data):void}
 */
const getDefaultExecutorFile = (commonPath, commonErrCb) => {
  return (onReadOkCb) =>
    edit(commonPath, onReadOkCb, commonErrCb, commonPath, commonErrCb);
};

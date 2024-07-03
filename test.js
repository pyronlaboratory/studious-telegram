/**
 * @description Determines if a given value `x` is present in an array `arr` within
 * a specified range `start` and `end`. It returns `true` if the value is found,
 * otherwise it recursively searches the range.
 * 
 * @param {array} arr - array whose elements are being searched for the given value
 * `x`.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {integer} start - index of the left bound of the subarray to be searched
 * within the original array.
 * 
 * @param {integer} end - 2nd index of the array where the searched element `x` is
 * located, and it is used to determine the range of indices to search within.
 * 
 * @returns {boolean} a boolean value indicating whether the specified element is
 * present in the array.
 */
const search = (arr, x, start, end) => {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;
  if (arr[mid] > x) {
    return search(arr, x, start, mid - 1);
  } else {
    return search(arr, x, mid + 1, end);
  }
};

/**
 * @description Retrieves the application ID based on parameters provided and logs
 * the result in the pipeline.
 * 
 * @returns {integer} a unique identifier for the specified application.
 */
const getApplicationID = () => {
  var appID = "";
  gs.log("appid: " + this.getParameter("sysparm_appName"), "pipeline");
  var grAppID = new GlideRecord("cmdb_ci_business_app");
  if (grAppID.get(this.getParameter("sysparm_appname"))) {
    appID = grAppID.number.toString();
    gs.log("appid: " + appID, "pipeline");
  }
 return appID;
}

/**
 * @description Takes an array of cells as input, loops through each row and column,
 * counts the number of alive neighbors, and outputs a new generation of cells where
 * each cell is labeled as alive or dead based on the counted number of alive neighbors.
 * 
 * @param {array} cells - 2D grid of cells that undergo evolution through the
 * generational process.
 * 
 * @returns {array} a new generation of cells, where each cell's state (alive or dead)
 * is determined based on its neighbors and the number of alive neighbors.
 */
function newGeneration(cells) {
  const nextGeneration = []
  for (let i = 0; i < cells.length; i++) {
    const nextGenerationRow = []
    for (let j = 0; j < cells[i].length; j++) {
      let neighbourCount = 0
      if (i > 0 && j > 0) neighbourCount += cells[i - 1][j - 1]
      if (i > 0) neighbourCount += cells[i - 1][j]
      if (i > 0 && j < cells[i].length - 1)
        neighbourCount += cells[i - 1][j + 1]
      if (j > 0) neighbourCount += cells[i][j - 1]
      if (j < cells[i].length - 1) neighbourCount += cells[i][j + 1]
      if (i < cells.length - 1 && j > 0) neighbourCount += cells[i + 1][j - 1]
      if (i < cells.length - 1) neighbourCount += cells[i + 1][j]
      if (i < cells.length - 1 && j < cells[i].length - 1)
        neighbourCount += cells[i + 1][j + 1]
      const alive = cells[i][j] === 1
      const cellIsAlive =
        (alive && neighbourCount >= 2 && neighbourCount <= 3) ||
        (!alive && neighbourCount === 3)
      nextGenerationRow.push(cellIsAlive ? 1 : 0)
    }
    nextGeneration.push(nextGenerationRow)
  }
  return nextGeneration
}

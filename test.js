/**
 * @description Checks if a specific value `x` is present in an array `arr` within a
 * specified range `start` and `end`. It returns true if the value is found, otherwise
 * it recursively searches for the value.
 * 
 * @param {array} arr - 2D array to be searched for the specified element `x`.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {number} start - index of the left boundary of the subarray to search within
 * the original array.
 * 
 * @param {number} end - 2nd index of the array, indicating the position after which
 * the search should continue from the middle index calculated in the function.
 * 
 * @returns {boolean} a boolean value indicating whether the element `x` exists within
 * the provided range in the array `arr`.
 */
const searching = (arr, x, start, end) => {
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
 * @description Retrieves and returns the application ID for a given parameter value.
 * It uses the `GlideRecord` class to query the database and retrieve the app ID.
 * 
 * @returns {integer} a unique identifier for the given business application.
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
 * @description Takes an array of cell values as input and returns a new generation
 * of cells, generated through a simple cellular automata ruleset.
 * 
 * @param {array} cells - 2D array of cells, where each cell can be alive (represented
 * by `1`) or dead (`0`), and is used to generate the next generation of cells through
 * a set of rules based on the neighbors of each cell.
 * 
 * @returns {array} a new generation of cells, where each cell is labeled as alive
 * or dead based on its neighbors and the number of alive cells in its vicinity.
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

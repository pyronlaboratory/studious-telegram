/**
 * @description Searches for an element `x` in an array `arr` within a specified range
 * `start` to `end`. It returns `true` if `x` is found, and `false` otherwise.
 * 
 * @param {array} arr - 2D array to be searched for the specified value `x`.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {integer} start - index of the left boundary of the subarray to search within.
 * 
 * @param {integer} end - 2nd half of the array to be searched for the specified value
 * `x`.
 * 
 * @returns {boolean} a boolean indicating whether the value `x` is present in the
 * array within the specified range.
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
 * @description Retrieves the application ID based on the input parameters and logs
 * the result to the pipeline log.
 * 
 * @returns {string} a unique identifier for an application.
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
 * @description Takes an array of cell states as input and generates a new generation
 * of cells based on a simple neighbours-counting algorithm, where alive cells have
 * at least two or three living neighbours to survive. The output is an array of cell
 * states representing the next generation.
 * 
 * @param {array} cells - 2D array of cells to be iterated over and used to generate
 * the next generation.
 * 
 * @returns {array} an array of booleans representing the alive cells in the next generation.
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

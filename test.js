<<<<<<< komment/main
/**
 * @description Iteratively compares an element 'x' with half of the total number of
 * elements 'start to 'end'. If it finds a matching element at any iteration, it
 * returns true; otherwise, it recursively calls itself with the remaining elements
 * until it reaches the end.
 * 
 * @param {array} arr - array to be searched for the target element.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {integer} start - index of the leftmost element that should be included in
 * the search result.
 * 
 * @param {integer} end - 2nd limit of the search array, beyond which the function
 * will not search.
 * 
 * @returns {boolean} a boolean value indicating whether the specified element exists
 * within the provided array.
 */
=======
>>>>>>> main
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
 * @description Retrieves an application ID based on a system parameter and a GlideRecord
 * query. It returns the retrieved ID as a string.
 * 
 * @returns {integer} an integer value representing the application ID.
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
 * @description Takes an array of cells as input, loops through each row of cells,
 * and calculates the probability that each cell is alive in the next generation based
 * on the number and type of neighbors. It then pushes the probability onto a new
 * array representing the next generation.
 * 
 * @param {array} cells - 2D grid of cells, with each cell value ranging from 0 (dead)
 * to 1 (alive), which is used to generate the next generation of cells through a
 * process of iterative addition and multiplication of neighboring cell values.
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

/***************************************************************/
/*
 This file will contain all functions that will handle all file
 system related functions
 */
/**************************************************************/

var fs = require('fs');

/**
 * This function accepts a path, reads package.json file
 * and returns the result
 * @param path
 */
exports.getPkgJsn = function(path) {
  return JSON.parse(fs.readFileSync(path + 'package.json', 'utf8'));
};

/**
 * This function accepts a directories array and path,
 * and it returns a list of files
 * @param path
 * @returns {*}
 */
exports.getDirFiles = function(path, dirList) {

  var files = [];

  dirList.forEach(function(dir){
    files = files.concat(fs.readdirSync(path + dir));
  });
  console.log(files);
  return files;
};
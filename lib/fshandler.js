/***************************************************************/
/*
 This file will contain all functions that will handle all file
 system related functions
 */
/**************************************************************/

var fs = require('fs'),
  path = require('path');

/**
 * This function accepts a path, reads package.json file
 * and returns the result
 * @param path
 */
exports.getPkgJsn = function (appPath) {

  var pkgJson = appPath + 'package.json';

  try {
    fs.accessSync(pkgJson, fs.F_OK);
    return JSON.parse(fs.readFileSync(appPath + 'package.json', 'utf8'));
  } catch (e) {
    // It isn't accessible
    // TODO: Add error handling
  }
};

/**
 * Checks file list and returns all the valid files
 * @param appPath
 * @param files
 * @param callback
 * @returns {Array}
 */
exports.checkFileList = function (appPath, files) {

  var checked = []; // Will hold all validated files

  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(appPath, files[i]);
    try {
      fs.accessSync(filePath, fs.F_OK);
      checked.push(filePath);
    } catch (e) {
      // It isn't accessible
      // TODO: Add error handling
    }
  }
  return checked;
};


/**
 * This function accepts a directories array and path,
 * and it returns a list of files
 * @param path
 * @returns {*}
 */
exports.getDirFiles = function (appPath, dirList) {

  var files = [];

  for (var i = 0; i < dirList.length; i++) {
    var currDir = path.join(appPath, dirList[i]);
    try {
      fileList = fs.readdirSync(currDir);
      for (var j = 0; j < fileList.length; j++) {
        var filePath = path.join(currDir, fileList[j]);
        try {
          fs.accessSync(filePath, fs.F_OK);
          if (fs.lstatSync(filePath).isFile()) {
            files.push(filePath);
          } else {
            files = files.concat(exports.getDirFiles('', [filePath]));
          }
        } catch (e) {
          // It isn't accessible
          // TODO: Add error handling
        }
      }
    } catch (e) {
      console.log(e); // TODO: delete this later
      // TODO: Add error handling
    }

  }

  return files;

};

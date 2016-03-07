/***************************************************************/
/*
 This file will contain all functions that will handle user input,
 and files list preparation which will be used later for comparing
 with the pkg list.
 */
/**************************************************************/

/**
 * Module dependencies
 */
var fsHandler = require('./fshandler'),
  fs = require('fs');

// Global script variables
var defaultDirs = ['controllers', 'routes', 'models'];
var defaultFiles = ['app.js', 'index.js'];
var fileList = [];

/**
 * This function will parse user input
 *
 * @param appPath
 * @param directories
 * @param files
 */
exports.parseInput = function (appPath, directories, files) {

  // Initiating dir list
  directories = directories.split(',');
  if (directories[0] == '') {
    console.log('No directories entered checking for default');
    directories = defaultDirs;
  }

  if (files.length == 0) {
    console.log('No files entered checking for default');
    files = defaultFiles;
  }

  fileList = fileList.concat(fsHandler.checkFileList(appPath, files));

  fileList = fileList.concat(fsHandler.getDirFiles(appPath, directories));

  return fileList;

};

/**
 * This function will iterate through files
 * and get all dependencies used in them
 * @param files
 */
exports.handleFiles = function (files) {

  filesDependencies = {};

  for (var i = 0; i < files.length; i++) {
    var fileContent = fs.readFileSync(files[i], 'utf8');
    var dependencies = fileContent.match(/require\((.*?)\)/gmi);
    if (dependencies) {
      for (var j = 0; j < dependencies.length; j++) {
        var dependency = dependencies[j].replace('require\(', '');
        var dependency = dependency.replace('\)', '');
        var dependency = dependency.replace(/\'|\"/g, '');
        if (!/\\|\//g.test(dependency)) {
          if (filesDependencies[dependency]) {
            filesDependencies[dependency].push(files[i]);
          } else {
            filesDependencies[dependency] = [];
            filesDependencies[dependency].push(files[i]);
          }
        }
      }
    }
  }

  return filesDependencies;
};
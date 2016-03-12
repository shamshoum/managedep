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
  fs = require('fs'),
  winston = require('winston');

// Global script variables
var fileList = [];

/**
 * Populates default files
 * @param appPath
 */
var initDefFiles = function(appPath) {
  var file = fsHandler.getDefFiles(appPath);
  if(file.error) {
    winston.error("None of the default project files were found, looking for: ", file.files);
    return[];
  } else {
    return file;
  }
};


var initDefDirs = function(appPath) {
  var dirs = fsHandler.getDefDirs(appPath);
  if(dirs.error) {
    winston.error("No default directories could be found, looking for: ", dirs.dirs );
    return[];
  return dirs;
  } else {
    return file;
  }
};

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
    var directories = [];
    defaultDirs = initDefDirs(appPath);
  }

  files = files.split(',');
  if (files[0] == '') {
    console.log('No files entered checking for default');
    files[0] = initDefFiles(appPath); // TODO: Maybe make this concat and return array instead of one file
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
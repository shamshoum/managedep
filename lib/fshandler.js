/***************************************************************/
/*
 This file will contain all functions that will handle all file
 system related functions
 */
/**************************************************************/

var fs = require('fs'),
  path = require('path'),
  winston = require('winston'),
  async = require('async');

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
    return '';
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
      if (filePath != 'app.js' && filePath != 'index.js') {
        winston.error('Issue with: ' + filePath, e);
      }
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
      var fileList = fs.readdirSync(currDir);
      for (var j = 0; j < fileList.length; j++) {
        var filePath = path.join(currDir, fileList[j]);
        try {
          fs.accessSync(filePath, fs.F_OK);
          if (fs.lstatSync(filePath).isFile()) {
            files.push(filePath);
          } else {
            var subFiles = new exports.getDirFiles('', [filePath]);
            files = files.concat(subFiles);
          }
        } catch (e) {
          // It isn't accessible
          winston.error('Issue with: ' + filePath, e);
        }
      }
    } catch (e) {
      winston.error('Issue with: ' + path.join(appPath, dirList[i]), e);
    }

  }

  return files;

};

/**
 * Checks for default starting app file
 * @param appPath
 * @returns {*}
 */
exports.getDefFiles = function (appPath) {
  var defFiles = ['index.js', 'app.js'];
  try {

    var dirContent = fs.readdirSync(appPath);
    for (var i = 0; i < defFiles.length; i++) {
      if (dirContent.indexOf(defFiles[i]) != -1) {
        return defFiles[i];
      }
    }
    return {error: true, files: defFiles};
  } catch (e) {
    winston.error(e);
  }
};

/**
 * Checks for default directories
 * @param appPath
 * @returns {*}
 */
exports.getDefDirs = function (appPath) {
  var defDirs = [];
  var defaultDirs = ['controllers', 'routes', 'models'];
  try {
    var dirContent = fs.readdirSync(appPath);
    for (var dir in defaultDirs) {
      if (dirContent.indexOf(dir) != -1) {
        defaultDirs.push(dir);
      }
    }
    if (defDirs.length == 0)
      return {error: true, dirs: defaultDirs};
    return defDirs;
  } catch (e) {
    winston.error(e);
  }

};

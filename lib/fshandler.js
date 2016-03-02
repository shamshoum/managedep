/***************************************************************/
/*
 This file will contain all functions that will handle all file
 system related functions
 */
/**************************************************************/

var fs = require('fs'),
  async = require('async');

/**
 * This function accepts a path, reads package.json file
 * and returns the result
 * @param path
 */
exports.getPkgJsn = function (path) {
  return JSON.parse(fs.readFileSync(path + 'package.json', 'utf8'));
};

/**
 * This function accepts a directories array and path,
 * and it returns a list of files
 * @param path
 * @returns {*}
 */
exports.getDirFiles = function (path, dirList, callback) {

  var files = [];

  async.forEach(dirList, function (dir, nextDir) {
    fileList = fs.readdirSync(path + dir);
    async.forEach(fileList, function (item, nextItem) {
      fs.stat(path + dir + '/' + item, function (err, stat) {
        if (err) {
          console.log('error occured');
          console.log(err);
        }
        if (stat.isFile()) {
          files.push(path + dir + path.sep + item);
        } else {
        }
        nextItem()
      });
    }, function (err) {
      if (err) {
        console.log('issue occured while listing files');
        console.log(err);
      }
      nextDir();
    });
  }, function (err) {
    if (err) {
      console.log('issue occured while listing files');
      console.log(err);
    }
    callback(files);
  });

};

exports.checkFileList = function(path, files, callback) {

};
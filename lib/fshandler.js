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
exports.getPkgJsn = function (path, callback) {
  fs.stat(path + 'package.json', function(err, stat){
    if(err){
      callback({success: false, err: err });
    } else {
      fs.readFile(path + 'package.json', function(err, content){
        callback({success: true, content: conten});
      });
    }
  });
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
          files.push(path + dir + '/' + item);
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
      console.log('issue occured while listing files'.red);
      console.log(err);
    }
    callback(files);
  });

};

exports.checkFileList = function(path, files, callback) {

  var checked = []; // Will hold all validated files

  async.forEach(files, function(file, nextFile){
    fs.stat(path + file, function (err, stat) {
      if(err) {
        console.log('File error please check file: ' + file);
        console.log(err);
      } else {
        console.log(file); // TODO: Delete this later
        checked.push(path + file);
      }
      nextFile();
    }, function(err){
      if(err){
        console.log('There was an error during validation: '.red);
        console.log(err);
      }
      console.log('checked.blue');
      callback(checked);
    });
  });
};
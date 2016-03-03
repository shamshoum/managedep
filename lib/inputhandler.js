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
var fsHandler = require('./fshandler');

var defaultDirs = ['controllers', 'routes', 'models'];

var defaultFiles = ['app.js', 'index.js'];

/**
 * This function will parse user input
 *
 * @param appPath
 * @param directories
 * @param files
 */
exports.parseInput = function(appPath, directories, files) {

  fsHandler.getPkgJsn(appPath, function(result){
    if(result.success) {
      var pkgJson = result.content;
      var pkgDependencies = pkgJson.dependencies;
    } else {
      console.log('There was an error getting package.json'.red);
      console.log(result.err);
      return;
    }
  });


  // Initiating dir list
  directories = directories.split(',');
  if(directories.length == 0) {
    console.log('No directories entered checking for default');
    directories = defaultDirs;
  }

  if(files.length == 0) {
    console.log('No files entered checking for default');
    files = defaultFiles;
  }

  var fileList = [];

  console.log('These are your current app %j dependencies: '.yellow, pkgJson.name);

  for(var dep in pkgDependencies){
    console.log('Dependency: ' + dep + ' Version: ' + pkgDependencies[dep]);
  }

  fsHandler.checkFileList(appPath, files, function(result){
    fileList.concat(result);
    fsHandler.getDirFiles(appPath, directories, function(result){
      fileList.concat(result);
      console.log(fileList);
    });
  });




};
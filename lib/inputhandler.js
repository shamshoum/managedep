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
require('colors');
var fs = require('fs');



/**
 * This function will parse user input
 *
 * @param appPath
 * @param directories
 * @param files
 */
exports.parseInput = function(appPath, directories, files) {

  console.log(appPath);

  var pkgJson = JSON.parse(fs.readFileSync(appPath + 'package.json', 'utf8'));
  var pkgDependencies = pkgJson.dependencies;

  console.log('These are your current app %j dependencies: '.yellow, pkgJson.name);

  for(var dep in pkgDependencies){
    console.log('Dependency: ' + dep + ' Version: ' + pkgDependencies[dep]);
  }

};
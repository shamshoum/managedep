# Node Dependency Manager

**This little command line tool is a work in progress !!!**

I still didn't decide to which direction it will go. What I do know is
that I would like to have a tool that will give me abilities to easily manage my apps dependencies.

Currently the tool will check which dependcies that are installed in
your package.json and aren't in actual use.

**Latest updates can be found in commits.**

This package requires a Node version of 0.12 and later

### How to start using the npm:

You can either install from npm and use it globaly:

```npm install -g node-dependency-manager``` 

```managdedep <path>```

or you can just clone this repository and use it like this:

```node index.js <path>```

Note: Path is optional if not entered will work on current folder

**Options: **

`-e / --error` Get only error logs (Note that resuts are also written as errors)

`-l / --log` Write logs to file

### Folders and files input examples:

Example for inputing folders:

    folder1,folder2,folder3,folder3\subfolder

If nothing was entered will use default folders(controllers, routes, models)

Example for inputing files:

    file1,file2,folder\file3

If nothing was entered will use default files(index.js, app.js)

**Packages in use:**
1. [Commander](https://github.com/tj/commander.js/ "Commander github")
2. [Prompt](https://github.com/flatiron/prompt "Prompt github")
3. [Colors](https://github.com/Marak/colors.js "Colors github")
4. [Winston](https://github.com/winstonjs/winston "Winston github")

Note: If you have any suggestions or bug reports don't hesitate to add
them to the issues in github and I will look at them and see what I can do.

**Known issues:**
- Input sometimes get skipped (This is an issue in prompt please see issue [#131](https://github.com/flatiron/prompt/issues/132))
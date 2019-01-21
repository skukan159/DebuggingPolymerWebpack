# DebuggingPolymerWebpack
Repository created with the purpose of fixing bugs related to transpiling and minifying Polymer project code using Webpack. It contains a reproduction of a bug.

To test the project run npm install and then run npm serve. The project works initially because the bug related to transpiling has been fixed, but if you try to uncomment the part of code that minimizes the bundle, you will get an error saying: "Unexpected token: name (extends)" and another error saying: "Unexpected token: keyword (const)".

An educated guess would be that something is not correct with the way the code is being transpiled.

Another bug is that you cannot run the npm run server command or node server.js without getting an error. That means you should use npm run serve for testing.

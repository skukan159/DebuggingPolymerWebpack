# DebuggingPolymerWebpack
Repository containing a reproduced bug created from transpiling a Polymer project with babel using webpack.

To test the project run npm install and then run npm serve. You will see the bug: "Uncaught TypeError: Class constructor PolymerElement cannot be invoked without 'new'"

To get rid of the bug, all you need to do is comment out transpiling with babel configuration inside of webpack. The problem is that transpiling is needed for minification and support for older browsers, so the conclusion is that the bug might be solved by modifying the options for babel loader.

Another bug is that you cannot run the npm run server command or node server.js without getting an error. It is still unclear why that is happening.


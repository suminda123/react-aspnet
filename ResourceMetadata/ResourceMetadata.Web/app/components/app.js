/** @jsx React.DOM */

var React = require('react');
var NavigationRouter = require('./NavigationRouter.js');

console.log("app.js file starting execution...");

if (window) {
    console.log("window === true...");
    window.onload = function(){
        console.log("window.onload.....");
        React.render(<NavigationRouter />,document.getElementById("content"));
    }
}
 
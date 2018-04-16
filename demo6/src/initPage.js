var config  = require('./config.json'); 
module.exports = function(){
	var templeHtml = document.createElement('div');
	templeHtml.textContent = config.content;
	return templeHtml
}
/*	Fiesta.js browser detection
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

// Built on browser-detect
var _BrowserDetect = {
	init: function () {
		
		// Store data
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		
		// Clear old functions
		this.searchString = Fiesta.makeUndefined();
		this.searchVersion = Fiesta.makeUndefined();
		this.dataBrowser = Fiesta.makeUndefined();
		this.dataOS = Fiesta.makeUndefined();
		
	},
	searchString: function(data) {
		var i = data.length;
		while (i --) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) !== -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "RockMelt",
			identity: "RockMelt"
		},
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// Newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// Older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS: [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};
_BrowserDetect.init();

// Get the current browser, version, OS
Fiesta.getBrowser = function() { return _BrowserDetect.browser };
Fiesta.getBrowserVersion = function() { return _BrowserDetect.version };
Fiesta.getOS = function() { return _BrowserDetect.OS };

// Get PPI
Fiesta.calculatePPI = function() {
	var ruler = document.createElement("div");
	ruler.style.width = "1in";
	document.body.appendChild(ruler);
	_BrowserDetect.ppi = parseInt(document.defaultView.getComputedStyle(ruler, null).getPropertyValue("width"));
	document.body.removeChild(ruler);
	return _BrowserDetect.ppi;
};
Fiesta.getPPI = function() { return _BrowserDetect.ppi || Fiesta.calculatePPI() };

// Does my browser support Fiesta?
Fiesta.checkSupport = function() {
	var canvas = !!document.createElement("canvas").getContext;
	var audio = !!document.createElement("audio").canPlayType;
	return (canvas && audio);
};

// Console logs, warnings, and errors
Fiesta.log = function(l) {
	if (Fiesta.SHOW_LOGS)
		console.log(l);
};
Fiesta.warn = function(w) {
	if (Fiesta.SHOW_WARNINGS)
		console.warn(w);
};
Fiesta.error = function(e) {
	if (Fiesta.SHOW_ERRORS)
		console.error(e);
};
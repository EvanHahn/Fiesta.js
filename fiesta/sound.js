/*	Sound
	A sound is...well, a sound.	*/

Fiesta.Sound = new JS.Class({
	
	// Constructor
	initialize: function(sources) {
		this._files = [];
		this._element;
		
		this.setFiles(sources);
	},
	
	// Set the sources
	setFiles: function(sources) {
		if (typeof sources === typeof "") {
			if (Fiesta.getFileExtension(sources) === "")
			{
				var soundExtensions = ["ogg", "wav", "mp3"];
				for (var i in soundExtensions)
					this._files.push(sources + "." + soundExtensions[i]);
			} else
				this._files = [sources];
		}
		else if (typeof sources === typeof [])
			this._files = sources;
		else
			throw new Error(sources + " isn't something I can make a sound out of.");
	},
	
	// Play!
	// I've tried better ways to do this (ie, using HTML5's play() on the
	// existing element), but those don't seem to work as reliably.
	play: function() {
		if (this._element)
			document.getElementsByTagName("body")[0].removeChild(this._element);
		var audio = document.createElement("audio");
		audio.setAttribute("autoplay", "autoplay");
		for (var i in this._files) {
			var source = document.createElement("source");
			source.setAttribute("src", this._files[i]);
			audio.appendChild(source);
		}
		document.getElementsByTagName("body")[0].appendChild(audio);
		this._element = audio;
	}
	
});
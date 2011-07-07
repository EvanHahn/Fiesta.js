/*	Fiesta.js sound
	License info:
	http://raw.github.com/EvanHahn/Fiesta.js/master/LICENSE.txt	*/

Fiesta.Sound = new Fiesta.Class(Fiesta.BaseObject, {
	
	// Constructor
	initialize: function(sources) {
		this._files = [];
		this._element;
		
		this.setFiles(sources);
	},
	
	// Sources API
	setFiles: function(sources) {
		if (Fiesta.isString(sources)) {
			if (Fiesta.getFileExtension(sources) === "") {
				var i = Fiesta.SOUND_EXTENSIONS.length;
				while (i --) {
					this._files.push(sources + "." + soundExtensions[i]);
				}
			} else
				this._files = [sources];
		}
		else if (Fiesta.isArray(sources))
			this._files = sources;
		else
			throw new Error(sources + " isn't something I can make a sound out of.");
	},
	
	// Play!
	// I've tried better ways to do this (ie, using HTML5's play() on the
	// existing element), but those don't seem to work as reliably.
	play: function() {
		if (this._element)
			document.body.removeChild(this._element);
		var audio = document.createElement("audio");
		audio.setAttribute("autoplay", "autoplay");
		var i = this._files.length;
		while (i --) {
			var source = document.createElement("source");
			source.setAttribute("src", this._files[i]);
			audio.appendChild(source);
		}
		document.body.appendChild(audio);
		this._element = audio;
	}
	
});

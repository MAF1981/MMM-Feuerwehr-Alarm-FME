Module.register("MMM-Feuerwehr-Alarm-FME",{
	
    // Default module config.
    defaults: {
        text: "Feuerwehr",
		textBig: "ALARM",
		color: "red",
		updateInterval: 1000,
		fadeSpeed: 100		
    },

	alarmZeitpunkt: "",
	showModule: false,
	
    // Override dom generator.
	getDom: function() {
		//return this.getAlarmHTML(false,this.alarmZeitpunkt);
		if(this.showModule == true) {
			this.show();
			return this.getAlarmHTML(false, this.alarmZeitpunkt);
		}else {
			this.hide();			
		}
	},
	
	/*
	 * show_alarm(sender)
	 * Receives the trigger to show the Alarm window. 
	 *
	 * argument sender - The sender who called the function
	 */
	show_alarm: function(sender) {
		//Fullscreen
		var content = this.getAlarmHTML(true, this.alarmZeitpunkt);
		document.body.insertBefore(content, document.body.firstChild);		
		setTimeout(function() {
			var overlay = document.getElementById("fwoverlay_fullscreen");
			overlay.parentNode.removeChild(overlay);			
		}, 10000);	
		this.showModule = true;
		this.updateDom();
    },
	
   show_small_alarm: function(sender) {
		var content = this.getAlarmHTML(false, this.alarmZeitpunkt);
		document.body.appendChild(content);
    },
	
	/* getAlarmHTML(isFullscreen)
	 * Creates the html structure for the Alarm.
	 *
	 * argument isFullscreen - If TRUE the suffix "_fullscreen" will be appended for the css
	 */
	getAlarmHTML: function(isFullscreen, alarmierungszeit) {		
		var cssSuffix = "";
		if(isFullscreen != null && isFullscreen != "undefined" && isFullscreen != "" && isFullscreen == true) {
			cssSuffix = "_fullscreen";
		} else { isFullscreen = false; }

		var alarmWrapper = document.createElement("div");
		alarmWrapper.className = "feuerwehr" + cssSuffix;
		alarmWrapper.id = "fwoverlay" + cssSuffix;

		//Fullscreen inner wrapper for centered text
		var alarmWrapperInner = document.createElement("div");
		alarmWrapperInner.id = "fwinnertext";
		alarmWrapperInner.className = this.config.classes ? this.config.classes : "feuerwehr_innertext" + cssSuffix;
		
		//Icon
		if(isFullscreen == true) {
			var alarmIcon = document.createElement("span");
			alarmIcon.id = "fwalarmicon";
			alarmIcon.className = "fa fa-fire fa-5x";
			alarmWrapperInner.appendChild(alarmIcon);
		}
		
		//Alarmtext (Feuerwehr)
		var alarmtext = document.createElement("span");
		alarmtext.id = "fwalarmtext";
		alarmtext.innerHTML = this.config.text + "<br/>";
		alarmtext.className = this.config.classes ? this.config.classes : "alarmtext" + cssSuffix;
		alarmWrapperInner.appendChild(alarmtext);

		//Alarmtext gross (ALARM) => nur im Vollbildmodus
		if(isFullscreen == true) {
			var alarmBig = document.createElement("span");
			alarmBig.id = "fwalarmtextbig";
			alarmBig.innerHTML = this.config.textBig + "<br/>";
			alarmBig.className = this.config.classes ? this.config.classes : "alarmtextbig" + cssSuffix;
			alarmWrapperInner.appendChild(alarmBig);
		}
		
		//Alarmzeit (Alarmierung um xx:xx Uhr)
		var alertTime = alarmierungszeit.format("HH:mm");
		var alarmzeit = document.createElement("span");
		alarmzeit.id = "fwalarmzeit";
		alarmzeit.innerHTML = "Alarmierung um " + alertTime + " Uhr" + "<br/>";
		alarmzeit.className = this.config.classes ? this.config.classes : "alarmzeit" + cssSuffix;
		alarmWrapperInner.appendChild(alarmzeit);
		
		//Alarmcounter (von moment(): vor ein paar Sekunden / Minuten, vor 5 Minuten...)
		var alarmcounter = document.createElement("span");
		alarmcounter.id ="fwalarmcounter";
		alarmcounter.innerHTML = "(" + moment(alarmierungszeit).fromNow() + ")";
		alarmcounter.className = this.config.classes ? this.config.classes : "alarmcounter" + cssSuffix;
		alarmWrapperInner.appendChild(alarmcounter);
		alarmWrapper.appendChild(alarmWrapperInner);
		return alarmWrapper;
	},
	
	updateCounter: function(alarmierungszeit) {
		var element =  document.getElementById('alarmcounter');
		if (typeof(element) != 'undefined' && element != null){
			element.innerHTML = "(." + moment(alarmierungszeit).fromNow() + ")";
		}
	},
	
	hide_alarm: function(sender) {	
		this.showModule = false;
		this.hide();
	},
	
	socketNotificationReceived: function(notification, payload) {
		Log.info(this.name + " received notification: " + notification + " with alarm time: " + payload);
		if(notification == "ALARMIERUNG_EIN") {
			//The timestamp from python script is a unix timestamp so we need to use the .unix() format before
			this.alarmZeitpunkt = moment.unix(payload);
			this.show_alarm(this.name);			
		} else if (notification == "ALARMIERUNG_AUS") {
			this.hide_alarm(this.name);
		}
	},	

	// Define start sequence.
	start: function() {
		//Has to be set by notification....
		this.alarmZeitpunkt = moment();
		this.sendSocketNotification("START_SNIFFER");
		var self = this;
		setInterval(function() {
			self.updateCounter(this.alarmZeitpunkt);
			self.updateDom();
		}, 1000);
		moment.locale(config.language);
		Log.info("Starting module: " + this.name);
	},
	
	// Define required scripts.
	getStyles: function() {
		return ["feuerwehr.css"];
	},
	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},
	
	// Define required translations.
	getTranslations: function() {
		// The translations for the defaut modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionairy.
		// If you're trying to build yiur own module including translations, check out the documentation.
		return false;
	}
});
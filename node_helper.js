var NodeHelper = require('node_helper');
const PythonShell = require('python-shell');
var pythonStarted = false;

module.exports = NodeHelper.create({
  
	start: function() {
		console.log("Starting node helper: " + this.name);
	},

	python_start: function () {
		var options = {
			mode: 'text',
		};
		const self = this;
		const pyshell = new PythonShell('/modules/feuerwehr/scripts/alarmsniffer.py', {"mode": "json"});
		pyshell.on('message', function (message) {	 
				console.log("Message " + message);
			if (message.hasOwnProperty('alarm')){
				console.log("[" + self.name + "] Alarm: " + message.alarm);
				if(message.alarm == "EIN") {
					console.log("jetztAlarmieren(ALARMIERUNG_EIN)");
					self.jetztAlarmieren("ALARMIERUNG_EIN", message.zeit);
				} else{
					console.log("jetztAlarmieren(ALARMIERUNG_AUS)");
					self.jetztAlarmieren("ALARMIERUNG_AUS", message.zeit);	
				}
			}
		});

		pyshell.end(function (err) {
			if (err) throw err;
			console.log("[" + self.name + "] " + 'finished running...');
		});
	},
  
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log(this.name + " node_helper.js socketNotificationReceived: " + notification);		
		if(notification == "START_SNIFFER") {
			if(!pythonStarted) {
				pythonStarted = true;
				this.python_start();
			};		
		}
	},
	
	jetztAlarmieren: function(socketNotificationName, zeit) {		
		this.sendSocketNotification(socketNotificationName, zeit);
	}
});
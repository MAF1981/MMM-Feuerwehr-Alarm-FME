# MMM-Feuerwehr-Alarm-FME
Zeigt einen eingehenden Alarm über einen Swissphone FME an.
* Es werden dazu Funksteckdosen benötigt, die an den Relaisausgang des Funkmeldeempfängers angeschlossen werden können und bei Alarm auslösen. Bspw.: http://juergenrupp.de/produkte/alarmzusatz-alarm-funksteckdosen-set/alarm-funksteckdosen-set/
* Für den Raspberry Pi wird ein 433MHz Empfänger benötigt. Für das Projekt habe ich folgendes Set verwendet (somit hat man auch gleich einen Sender, fürs nächste Projekt...): <a href="http://amzn.to/2nFSbk9" target="_blank">http://amzn.to/2nFSbk9</a>
* Der Grundaufbau erfolgte nach folgendem Tutorial: https://tutorials-raspberrypi.de/raspberry-pi-funksteckdosen-433-mhz-steuern/

<table>
<tr>
<td>
<img src="https://cloud.githubusercontent.com/assets/26480749/25527304/8afd1e2c-2c18-11e7-97ca-3a2ad28e17e5.jpg" border="0" height="250px">
</td>
<td>
<img src="https://cloud.githubusercontent.com/assets/26480749/25527303/8af9ceb6-2c18-11e7-897e-f704bcc81c25.jpg" border="0" height="250px">
</td>
<td>
<img src="https://cloud.githubusercontent.com/assets/26480749/25527305/8afdf19e-2c18-11e7-8d15-c8aa3c955765.jpg" border="0" height="250px">
</td>
</tr>
</table>

## Voraussetzungen
Die folgenden Voraussetzungen sind nötig, damit das Modul richtig funktioniert:
* <a href="https://github.com/MichMich/MagicMirror" target="_blank" title="MagicMirror2">MagigMirror<sup>2</sup></a> (mind. v2.1.0)
* <a href="https://www.npmjs.com/package/python-shell" target="_blank" title="python-shell">python-shell</a>
* <a href="https://github.com/lexruee/pi-switch-python" target="_blank" title="pi-switch-python">pi-switch-python</a>  !!Deprecated!!<br/> Sollte auf RPI-RF umgebaut werden... <a href="https://github.com/milaq/rpi-rf" target="_blank" title="rpi-rf">rpi-rf</a>
* <a href="https://momentjs.com" target="_blank" title="moment.js">moment.js</a>

## Installation
In einer Command-Shell ins "Modules" Verzeichnis der MagigMirror Installation wechseln:
````
cd ~/MagicMirror/modules
````

Repository klonen:
````
git clone https://github.com/MAF1981/MMM-Feuerwehr-Alarm-FME
````

Die MM `config.js` Datei anpassen.

## Module verwenden

In der `config/config.js` muss MMM-Feuerwehr-Alarm-FME registriert werden:
````javascript
modules: [
 {
			module: 'MMM-Feuerwehr-Alarm-FME',
			position: 'middle_center', // This can be any of the regions.
			config: {
				// Needs to be developed and considered in the js file
				text: 'Feuerwehr',
				textBig: 'ALARM'
				}
 }
]
````

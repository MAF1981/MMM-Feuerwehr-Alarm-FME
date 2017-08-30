#!/usr/bin/env python
import os
import sys
import json
import datetime
import time
import subprocess

from pi_switch import RCSwitchReceiver

#!!! Do not set any other print() except it returns a JSON !!!
def alarmsniffer():
	alarm_codes_ein = ['1361', '4433', '5201', '5393']
	alarm_codes_aus = ['1364', '4436', '5204', '5396']
	receiver = RCSwitchReceiver()
	receiver.enableReceive(2)
	while True:
		if receiver.available():
				received_value = receiver.getReceivedValue()
				if (received_value):
					if any(str(received_value) in s for s in alarm_codes_ein):
						alarm('EIN')
						subprocess.call("sh monitor_on.sh &> /dev/null", shell=True)
					if any(str(received_value) in s for s in alarm_codes_aus):
						alarm('AUS')
				receiver.resetAvailable()
		time.sleep(.5);

def alarm(action):
	ALARMZEIT = str(time.time()).split('.')[0]
	results = {'alarm': action, 'zeit': ALARMZEIT}
	if(action == 'EIN'):
		saveFile(action + ":" + ALARMZEIT)
	
	dictionaryToJson = json.dumps(results)
	print dictionaryToJson
	sys.stdout.flush()

def saveFile(alarm):
	ALARMFILE = "../feuerwehralarme.log"
	mode = 'a' if os.path.exists(ALARMFILE) else 'w'
	with open(ALARMFILE, mode) as f:
		f.write(alarm + '\n')
		f.close()

if __name__ == '__main__':
	alarmsniffer()

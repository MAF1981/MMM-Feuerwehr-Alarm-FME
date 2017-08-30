#!/bin/bash

tvservice -p
# REMIND THE ` !!! It is NOT a ' or a "
	chvt 1
	chvt 7
#curr_vt=`fgconsole`
#echo "... $curr_vt"
#if ["$curr_vt" == ""]
#then
#	curr_vt = 7
#fi
#
#if [ "$curr_vt" = "1" ]
#then
#	chvt 2
#	chvt 7
#else
#	chvt 1
#	chvt "$curr_vt"
#fi
exit 0
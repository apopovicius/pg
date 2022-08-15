#!/bin/bash -l
RUN_TESTS="false"
if [ $RUN_TESTS ]
then
	echo "Full build mode!"
else
	echo "Build only mode!"
fi

$RUN_TESTS && echo "Full build mode!"; echo "Build only mode!"

#!/bin/bash
HARNESS=true
ARG1="--platform macos --signBuild --is_cmake_build --xcpretty --upgrade"
[ $HARNESS = "true" ] && ARGS="${ARG1} --developer_harness_tests" || ARGS="${ARG1}" ; echo "false"
echo "$ARGS"
echo "PYTHONPATH=spark-client-scripts python2 -u -m jobs_infrastructure.applePlatformBuilder $ARGS"

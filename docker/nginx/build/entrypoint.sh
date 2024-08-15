#!/bin/bash

/docker-entrypoint.sh
# filebeat modules enable nginx
# metricbeat modules enable nginx

# filebeat setup
# metricbeat setup

# service filebeat start
# service metricbeat start

nginx -g "daemon off;"
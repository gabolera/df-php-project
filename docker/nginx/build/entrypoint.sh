#!/bin/bash

# wait_elk() {
#   while ! nc -z elk 9200; do
#     echo "Aguardando elk iniciar..."
#     sleep 2
#   done
# }

# wait_elk

/docker-entrypoint.sh
chmod go-w /etc/filebeat/modules.d/nginx.yml
filebeat modules enable nginx
filebeat setup
service filebeat start
nginx -g "daemon off;"
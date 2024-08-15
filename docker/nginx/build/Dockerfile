FROM nginx:latest

RUN apt-get update && apt-get install -y netcat-openbsd
RUN rm -f /var/log/nginx/access.log && rm -f /var/log/nginx/error.log

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.13.0-amd64.deb && \
    dpkg -i filebeat-7.13.0-amd64.deb

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-8.13.4-amd64.deb && \
    dpkg -i metricbeat-8.13.4-amd64.deb

COPY filebeat.yml /etc/filebeat/filebeat.yml
COPY metricbeat.yml /etc/metricbeat/metricbeat.yml

COPY --chmod=go-w nginx-filebeat.yml /etc/filebeat/modules.d/nginx.yml
COPY --chmod=go-w nginx-metricbeat.yml /etc/metricbeat/modules.d/nginx.yml

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
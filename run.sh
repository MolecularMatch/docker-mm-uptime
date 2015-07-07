cd /tmp

npm install

#Pull down certs from etcd server and write them to /etc/nginx/
#nodejs get_certs.js

cd /tmp/uptime

#Start by setting up the configuration file with environment variables
sed -i "s/{username}/$USERNAME/" /tmp/uptime/config/production.yaml
sed -i "s/{password}/$PASSWORD/" /tmp/uptime/config/production.yaml
sed -i "s/{emailUsername}/$EMAIL_USERNAME/" /tmp/uptime/config/production.yaml
sed -i "s/{emailPassword}/$EMAIL_PASSWORD/" /tmp/uptime/config/production.yaml

#Finally run the application
node monitor & node app
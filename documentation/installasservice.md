# For Install this middleware as a service

## Install forever globaly
sudo npm install -g forever
## Create log and pid directories
```
sudo mkdir /var/log/facturacionapp
sudo mkdir /var/run/facturacionapp

```
## Change Owner to ubuntu
```
sudo chown -R ubuntu:ubuntu /var/log/facturacionapp
sudo chown -R ubuntu:ubuntu /var/run/facturacionapp
```
## Change Mode to 755
```
sudo chmod -R 755 /var/log/facturacionapp
sudo chmod -R 755 /var/run/facturacionapp
```
## Copy Init Script
```
sudo su
cp facturacionapp /etc/init.d/
chmod a+x /etc/init.d/facturacionapp
```
## After putting the script in place, update the system service definition
```
update-rc.d facturacionapp defaults
```
## How to Use
```
service facturacionapp start
service facturacionapp status
service facturacionapp restart
service facturacionapp stop
```

References
https://www.exratione.com/2013/02/nodejs-and-forever-as-a-service-simple-upstart-and-init-scripts-for-ubuntu/
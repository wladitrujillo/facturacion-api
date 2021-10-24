# How Install NodeJS on Ubuntu

## Install Node.js from NodeSource Repository

### Update repositories
sudo apt update
### Download especific version of Node for Install
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
### Install NodeJS
sudo apt install -y nodejs
### Verify installtion of Node.js and npm running following command
node --version
npm --version
### Install Development Tools
sudo apt install gcc g++ make

# Uninstall Node.js and npm
sudo apt remove nodejs npm
sudo apt autoremove

References
https://linux4one.com/how-to-install-node-js-with-npm-on-ubuntu-18-04/
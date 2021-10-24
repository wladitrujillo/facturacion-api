#!/bin/sh
echo "Building app prod version can take some minutes ..."
npm run build
echo "Compress ..."
tar -czvf ~/facturacion_api.tar.gz dist/
echo "Sending data ..."
sftp groupmobil << EOF
lcd ~
put facturacion_api.tar.gz
bye
EOF
echo "Deploying ..."
ssh groupmobil << EOF
sudo service facturacionapp stop
tar -xzvf facturacion_api.tar.gz
cp -R dist/* ~/FACTURACION_HOME/
cp dist/.env ~/FACTURACION_HOME/
rm facturacion_api.tar.gz
rm -R dist
sudo service facturacionapp start
exit
EOF
echo "Cleaning build"
rm ~/facturacion_api.tar.gz
echo "Finish script."
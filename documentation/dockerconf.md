## pull docker mongo image
sudo docker pull mongo

## create docker container expose port 27017
sudo docker run --name invoiceweb -p 27017:27017 -d mongo

## detener docker container
sudo docker invoiceweb stop

## start docker container
sudo docker invoiceweb start
# Facturacion Api

## Requires .env file
```
PORT=8080
DATABASE=mongodb://localhost:27017/facturacion
SECRET=
OPENSSL_CONF=/tmp/openssl.cnf
GMAIL_USER=
GMAIL_SECRET=
WEB_URL=http://localhost:4200
```

## Populate database
```
node populatedb mongodb://localhost:27017/facturacion
```

### Fix issue html-pdf on ubuntu
```
sudo apt-get install phantomjs
``` 
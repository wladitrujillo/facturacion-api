var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./reports/template.html', 'utf8');

var options = {
 

   
   
    // Rendering options
    "base": "file:///home/cecy/git_cecy/facturacion-api/reports/assets" // Base path that's used to load files (images, css, js) when they aren't referenced using a host
   
    
   
  }


  pdf.create(html, options).toFile('./factura.pdf', function(err, res) {
    if (err) return console.log("Error ====>",err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
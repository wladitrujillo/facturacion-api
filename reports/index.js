var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./template.html', 'utf8');

var options = {
 
 
   
   
    // Rendering options
    "base": "file:///home/nelson/git_nt/myreport/assets" // Base path that's used to load files (images, css, js) when they aren't referenced using a host
   
  
   
  }


  pdf.create(html, options).toFile('./factura.pdf', function(err, res) {
    if (err) return console.log("Error ====>",err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
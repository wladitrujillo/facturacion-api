import app from "./app";

//Puerto para el enlace de la aplicacion
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
const express = require('express');
const fs = require('fs');
const app = express();
const puerto = 8088;
const ruta = "./productos.txt";
const visitas = new Object();
visitas.items = 0;
visitas.items_random = 0;

function random(min, max) {
    return ((Math.random() * (max - min)) + min);
}

app.get('/items', (req, res) => {

    visitas.items++;
    async function read(ruta) {
        try {
            const archivo = await fs.promises.readFile(ruta);
            res.send(JSON.parse(archivo));
        } catch (err) {
            res.send("No se encontraron productos");
        }
    }
    read(ruta);

});
app.get('/item-random', (req, res) => {
    visitas.items_random++;
    async function read(ruta) {
        try {
            const archivo = await fs.promises.readFile(ruta);
            largoArray = JSON.parse(archivo).length - 1;
            res.send(JSON.parse(archivo)[random(0, largoArray).toFixed(0)]);
        } catch (err) {
            res.send("No se encontraron productos");
        }
    }
    read(ruta);
});

app.get('/visitas', (req, res)=>{
    
    res.send(visitas)
})

app.listen(puerto, ()=>{
    console.log(`El servidor esta escuchando en puerto ${puerto}`)
})
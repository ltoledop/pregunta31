import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './config/connection.js';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

let dbConnected = false;

pool.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
        dbConnected = true; 
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { dbConnected });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("El servidor está siendo escuchado en el puerto: ", process.env.PORT || 3000);
});

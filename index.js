require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080;

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


conexion.connect((err) => {
    if (err) {
        console.error(`Error en la conexión: ${err.stack}`)
        return;
    }
    console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/login', (req, res, next) => {
    res.render('login', {
        titulo: 'Somos el Grupo G9'
    })
});

app.post('/login', (req, res) => {
    const { usuario, pass } = req.body;
    res.render('cargaexitosa', {
        titulo: 'Su carga ha sido exitosa'})
        
    
        
if (usuario == '' || pass == '') {
        let validacion = 'Rellene los campos correctamente.';
                res.render('login', {
                Titulo: 'Login',
                validacion
        })
        }  else {
    
            let datos = {
                Usuario:usuario, 
                Pass:pass
            };
    
            
            
            let sql = 'INSERT INTO Registro set ?';
    
            conexion.query(sql, datos, (err, result) => {
                if (err) throw err;
                res.render('login', {
                    titulo: 'Acceso Conseguido'
                });
            })
    
        }
        
});



app.get('/usuarios', (req,res) => {
    
    let sql = 'SELECT Usuario FROM registro';

    conexion.query(sql, (err, result) => {
        if (err) throw err;
        res.render('usuarios', {
            titulo : 'Bienvenido',
            results : result
        
        }) 
    })
})

app.listen(PORT, () =>{
    console.log(`corriendo en el puerto ${PORT}`)
});





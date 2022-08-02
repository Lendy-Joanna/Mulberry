const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const handleBars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");
const logger = require('morgan');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload'); // files

// Invocación de archivo .env
require('dotenv').config({
    path: path.join(__dirname, '.env'),
});

// Configuración de base de datos con Mongoose
const mongoose = require('mongoose');
const Usuario = require('./models/UsuarioModel');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log(err));

// Configuración de rutas
const usuarioRoutes = require('./routes/UsuarioRoutes');
const mujerRoutes = require('./routes/MujerRoutes');
const titles = require('./config/titles');

const app = express();
app.use(fileUpload()); // files
// Clave secreta
app.use(session({
    secret: process.env.KEY_SECRET,
    resave: true,
    saveUninitialized: true,
}));

// view engine setup
const { engine } = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: 'hbs',
    helpers: {

        if_eq(a, b, opts) {
            if (a === b) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        },
        if_eq_string(a, b, opts) {
            if (a.toString() === b.toString()) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        },
        if_mayor_eq(intentoEx, intentosUs, opts) {
            if (intentoEx > intentosUs || intentoEx == 0) {
                return opts.inverse(this);
            }
            return opts.fn(this);
        },
        if_obj(objt, ObjEntrega, opts) {
            let ban = false;
            if (!objt || !ObjEntrega) {
                return opts.inverse(this);
            }
            for (let index = 0; index < ObjEntrega.length; index++) {
                if ((objt._id.toString() === ObjEntrega[index].cvEntregaActividad.cvActividad.toString()) && ObjEntrega[index].calificacion >= 8) {
                    ban = true;
                    break;
                }
            }
            if (ban) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        },
        operacionar(a, b, operacion) {
            let c;
            switch (operacion) {
            case '+':
                c = a + b;
                break;
            case '-':
                c = a - b;
                break;
            case '/':
                c = a / b;
                break;
            case '*':
                c = a * b;
                break;

            default:
                c = a + b;
                break;
            }
            return c;
        },

    },
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride("_method"));

app.use(async (req, res, next) => {
    const token = req.cookies['x-access-token'];

    if (token) {
        const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(`App.js ${userId}`);
        // Verifica si el token ha expirado
        // if (exp < Date.now().valueOf() / 1000) {
        // res.render('home', { title: titles.view.home, errors: { msg: titles.error.errorInesperado } });
        // }
        req.usuario = await Usuario.findById(userId);
        req.token = token;
        next();
    } else {
        next();
    }
});

app.use('/', usuarioRoutes);
app.use('/', mujerRoutes);



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// eslint-disable-next-line eol-last
module.exports = app;

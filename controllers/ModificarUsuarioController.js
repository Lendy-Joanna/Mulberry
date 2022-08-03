const Usuario = require('../models/UsuarioModel'); // Referencia modelo
const titles = require('../config/titles'); 

const usuarioController = {};
/*
    Funcion que renderiza la vista con sus respectivas consultas
*/

///rol hombre
usuarioController.modificar = function desplegarVista(req, res) {
   // res.render('../views/usuario/recuperarContrasenia', { title: titles.view.recuperarContrasenia });
   Usuario.findOne({ _id: req.query.email })
   .exec(async (error, usuario2) => {
       if (error) {
           // console.log('Error: ', error);
           req.flash('mensaje', 'Lo sentimos hubo un error');
       } else {
           const user = usuario2.toJSON();
           res.render('../views/hombre/modificarUsuario', {
               title: titles.view.modificarUsuario,
               user,
           });
       }
   });
};
//rol mujer
usuarioController.modifica = function desplegarVista(req, res) {
    // res.render('../views/usuario/recuperarContrasenia', { title: titles.view.recuperarContrasenia });
    Usuario.findOne({ _id: req.query.email })
    .exec(async (error, usuario2) => {
        if (error) {
            // console.log('Error: ', error);
            req.flash('mensaje', 'Lo sentimos hubo un error');
        } else {
            const user = usuario2.toJSON();
            res.render('../views/mujer/modificaUsuario', {
                title: titles.view.modificarUsuario,
                user,
            });
        }
    });
 };
 
/*
    Funcion que modifica al usuario y donde guarda imagen y sus datos correspondientes
*/
//rol hombre
usuarioController.modificarPost = function modificarPost(req, res) {
    Usuario.findOne({ _id: req.query.email })
        .exec(async (error, usuario) => {
            // console.log(usuario);
            console.log(usuario);
            const user = usuario.toJSON();

            if ((usuario.email === req.body.email) === false) {
                Usuario.findOne({ email: req.body.email }).exec((err, u) => {
                    if (u != null) {
                        res.render('../views/hombre/modificarUsuario',
                            {
                                mensaje: `El email: ${req.body.email} ya está registrado, intente con otro`,
                                title: titles.view.modificarUsuario,
                                user,
                            });
                    }
                });
            } else {
                usuario.nombre = req.body.nombre;
                usuario.appPaterno = req.body.appPaterno;
                usuario.appMaterno = req.body.appMaterno;
                usuario.email = req.body.email;
                if (req.files) {
                    const imagen = req.files.rutaFoto;
                    // eslint-disable-next-line no-underscore-dangle
                    const nombreImagen = usuario._id + Date.now() + imagen.name;
                    usuario.rutaFoto = nombreImagen;
                }
                usuario.save();
                req.session.usuario = usuario;
                res.redirect('/welcomeh');
            }
        });
};
//rol mujer
usuarioController.modificaPost = function modificaPost(req, res) {
    Usuario.findOne({ _id: req.query.email })
        .exec(async (error, usuario) => {
            // console.log(usuario);
            console.log(usuario);
            const user = usuario.toJSON();

            if ((usuario.email === req.body.email) === false) {
                Usuario.findOne({ email: req.body.email }).exec((err, u) => {
                    if (u != null) {
                        res.render('../views/mujer/modificaUsuario',
                            {
                                mensaje: `El email: ${req.body.email} ya está registrado, intente con otro`,
                                title: titles.view.modificarUsuario,
                                user,
                            });
                    }
                });
            } else {
                usuario.nombre = req.body.nombre;
                usuario.appPaterno = req.body.appPaterno;
                usuario.appMaterno = req.body.appMaterno;
                usuario.email = req.body.email;
                if (req.files) {
                    const imagen = req.files.rutaFoto;
                    // eslint-disable-next-line no-underscore-dangle
                    const nombreImagen = usuario._id + Date.now() + imagen.name;
                    usuario.rutaFoto = nombreImagen;
                }
                usuario.save();
                req.session.usuario = usuario;
                res.redirect('/welcome');
            }
        });
};

module.exports = usuarioController;
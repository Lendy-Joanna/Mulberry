// agregar mensajes 
module.exports = {
    view: {
        home: 'Ingreso al sistema',
        index: 'Bienvenido',
        politicas: 'Politicas del sistema',
        nosotros: 'Quienes somos',
        contacto: 'Contactanos',
        registro: 'Registro de Usuario',
        welcome: 'Bienvenido ',
        verCategoria: 'Categorias',
        modificarUsuario: 'Modificar Usuario',
    },
    error: {
       /// Funcionalidad de Login
        emailVacio: 'Se requiere un correo electrónico',
        emailIncorrecto: 'El email es incorrecto',
        errorInesperado: 'Lo sentimos hubo un error. Consulte con el administrador',
        estadoVerificacion: 'Se necesita activar el campo de verificación',
        permiso: 'No tienes permiso para ejecutar ésta acción',
        loggedInUser: 'Necesitas ingresar para acceder a ésta ruta',
        expiredSession: 'La sesión ha expirado , por favor ingresar nuevamente',

        fechaInicio: 'La fecha de inicio es inválida',
        fechaFin: 'La fecha final es inválida',

        appPaterno: 'Se requiere un Apellido Paterno',
        appPaternoLongitudMinima: 'Se requiere un mínimo de 3 carácteres',
        appPaternoLongitudMaxima: 'Se requiere un máximo de 100 carácteres',
        appMaterno: 'Se requiere un Apellido Materno',
        appMaternoLongitudMinima: 'Se requiere un mínimo de 3 carácteres',
        appMaternoLongitudMaxima: 'Se requiere un máximo de 100 carácteres',
        nombreVacio: 'Se requiere un Nombre',
        nombreLongitudMinima: 'Se requiere un mínimo de 3 carácteres',
        nombreLongitudMaxima: 'Se requiere un máximo de 100 carácteres',
        rutaFoto: 'Se requiere una Ruta para foto',

        passwordVacio: 'Se requiere una contraseña',
        passwordVacioConfirmar: 'Se requiere confirmar la contraseña',
        passwordLongitudMinima: 'La contraseña debe contener mínimo 6 caracteres',
        passwordLongitudMaxima: 'La contraseña debe contener máximo 15 caracteres',
        passwordAlmenosUnCaracterMayuscula: 'La contraseña debe un caracter mayúscula',
        passwordAlmenosUnCaracterMinuscula: 'La contraseña debe un caracter minúscula',
        passwordAlmenosUnCaracterNumero: 'La contraseña debe un caracter número',
        passwordAlmenosUnCaracterEspecial: 'La contraseña debe un caracter Especial #?!@$%^&*-',
        passwordSinEspacios: 'La contraseña no debe contener un caracter espacio en blanco',
        passwordIncorrecto: 'La contraseña es Incorrecta',
        errorBorradoEspecialidad: 'No puedes hacer esto, hay grupo(s) ligado(s) a esta especialidad',
        errorActualizacionDocente: 'No puedes hacer esto, el docente tiene curso(s) activo(s)',
    },
    mensajes: {
        correoNoRegistrado: 'El correo no esta registrado!!',
        correoEnviado: 'Correo enviado, Revisa tu Bandeja de entrada',
        codigoNoValido: 'EL codigo no es Valido o ya expiro',

    },
};
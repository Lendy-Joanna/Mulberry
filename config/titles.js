// agregar mensajes 
module.exports = {
    view: {
        home: 'Ingreso al sistema',
        index: 'Bienvenido',
        politicas: 'Politicas del sistema',
        nosotros: ' somos',
        contacto: 'Contactanos',
        registro: 'Registro de Usuario',
        maquillaje: 'Productos de belleza',
        skincare: 'Productos para la piel',
        manicura: 'Productos para las manos',
        accesorios: 'Complementos de estilo',
        comprar: 'Obten tus productos',
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
        loggedInUser: 'Necesitas ingresar para acceder',
        expiredSession: 'La sesión ha expirado , por favor ingresar nuevamente',

        fechaInicio: 'La fecha de inicio es inválida',
        fechaFin: 'La fecha final es inválida',

        appPaterno: 'Se requiere un Apellido Paterno',
        appPaternoLongitudMinima: 'Se requiere un mínimo de 3 carácteres para Apellido Paterno',
        appPaternoLongitudMaxima: 'Se requiere un máximo de 100 carácteres para Apellido Paterno',
        appMaterno: 'Se requiere un Apellido Materno',
        appMaternoLongitudMinima: 'Se requiere un mínimo de 3 carácteres para Apellido Materno',
        appMaternoLongitudMaxima: 'Se requiere un máximo de 100 carácteres para Apellido Materno',
        nombreVacio: 'Se requiere un Nombre',
        nombreLongitudMinima: 'Se requiere un mínimo de 3 carácteres para Nombre',
        nombreLongitudMaxima: 'Se requiere un máximo de 100 carácteres para Nombre',
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
    
        //Funcionalidad contacto
        telefono: 'Se requiere un telefono',
        telefonoLongitudMinima: 'Se requiere un mínimo de 8 números para telefono',
        telefonoLongitudMaxima: 'Se requiere un máximo de 15 números para telefono',
        asunto: 'Se requiere un asunto',
        asuntoLongitudMinima: 'Se requiere un mínimo de 3 carácteres para asunto',
        asuntoLongitudMaxima: 'Se requiere un máximo de 50 carácteres para asunto',
        mensaje: 'Se requiere un mensaje',
        mensajeLongitudMinima: 'Se requiere un mínimo de 10 carácteres para mensaje',
        mensajeLongitudMaxima: 'Se requiere un máximo de 100 carácteres para mensaje',
    },
    mensajes: {
        correoNoRegistrado: 'El correo no esta registrado!!',
        correoEnviado: 'Correo enviado, Revisa tu Bandeja de entrada',
        codigoNoValido: 'EL codigo no es Valido o ya expiro',
        contactoEnviado: 'Mensaje enviado',

    },
};
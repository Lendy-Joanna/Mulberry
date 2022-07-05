const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken(usuarioId) {
        // eslint-disable-next-line no-underscore-dangle
        return jwt.sign({ userId: usuarioId._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },
    getLoggedInUser(res) {
        return res.locals.loggedInUser;
    },
    verifySession(req) {
        const sesion = req.session.usuario;
        if (sesion) {
            return true;
        }
        return false;
    },
    capitalize(word) {
        if (typeof word !== 'string') return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    },
};

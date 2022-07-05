const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = (function () {
    ac.grant('mujer')
        .readOwn('profile')
        .updateOwn('profile');

    ac.grant('hombre')
        .readOwn('profile')
        .updateOwn('profile');

    ac.grant('admin')
        .extend('mujer')
        .extend('hombre')
        .updateAny('profile')
        .deleteAny('profile');

    return ac;
}());

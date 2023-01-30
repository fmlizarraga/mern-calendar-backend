/* 
    Rutas de Usuarios / Auth
    host + /api/auth
 */

const { Router } = require('express');
const { body } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post(
    '/new', 
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Passsword must have at least 5 characters').isLength({min: 5}),
        validateFields,
    ],
    createUser 
);

router.post(
    '/', 
    [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Passsword must have at least 5 characters').isLength({min: 5}),
        validateFields,
    ],
    loginUser 
);

router.get('/renew', validateJWT, renewToken );

module.exports = router;
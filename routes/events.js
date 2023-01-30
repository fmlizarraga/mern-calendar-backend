/* 
    Rutas de Eventos / Events
    host + /api/events
 */

const { Router } = require('express');
const router = Router();
const { body, param } = require('express-validator');

const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

router.use( validateJWT );

router.get( '/', getEvents );

router.post( '/', [
    body( 'title', 'Title must be present' ).notEmpty(),
    body( 'start', 'Start date invalid or not present' ).custom( isDate ),
    body( 'end', 'End date invalid or not present' ).custom( isDate ),

    validateFields

], newEvent );

router.put( '/:id', [
    body( 'title', 'Title must be present' ).notEmpty(),
    body( 'start', 'Start date invalid or not present' ).custom( isDate ),
    body( 'end', 'End date invalid or not present' ).custom( isDate ),
    param( 'id', 'Invalid id' ).isMongoId(),

    validateFields
], updateEvent );

router.delete( 
    '/:id', 
    [
        param( 'id', 'Invalid id' ).isMongoId(),

        validateFields
    ],
    deleteEvent 
);

module.exports = router;
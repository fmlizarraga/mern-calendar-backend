const jwt = require('jsonwebtoken');

exports.generateJWT = ( uid, name ) => {

    return new Promise( ( reslve, reject ) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => { 
            if ( err ) {
                console.log(err)
                reject( 'Could not generate token' );
            }

            reslve( token );

         } );
    });
};
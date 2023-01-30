const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

exports.createUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'That email is alredy in use'
            });
        }

        
        user = new User( req.body );
        
        // encrypt password
        user.password = bcrypt.hashSync( password, 12 );

        await user.save();

        // Gen JWT
        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            msg: 'User registered',
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Error, please contact admin.',
        });
    }
};


exports.loginUser = async( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong email or password'
            });
        }

        // check password
        const isCorrectPassword = bcrypt.compareSync( password, user.password );
        if (!isCorrectPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong email or password'
            });
        }

        // Generate JSON Web Token
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            msg: 'User confirmed',
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Error, please contact admin.',
        });
    }
};

exports.renewToken = async( req, res = response ) => {

    const token = await generateJWT(req.uid, req.name);

    res.json({
        ok: true,
        msg: 'token validated and renewed',
        token
    });
};
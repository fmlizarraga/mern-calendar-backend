const { response } = require('express');
const Event = require('../models/Event');

exports.getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        msg: 'All events retrieved',
        events
    });
};

exports.newEvent = async (req, res = response) => {

    const event = new Event(req.body);
    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            msg: 'New Event Created',
            event: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error trying to save new event'
        });
    }
};

exports.updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Error event not found'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to update event'
            });
        }

        const newEventFields = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEventFields, { new:true } );

        res.status(200).json({
            ok: true,
            msg: 'Event Updated',
            event: updatedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error trying to update event'
        });
    }

};

exports.deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Error event not found'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to delete event'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: 'Event deleted',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error trying to update event'
        });
    }

};

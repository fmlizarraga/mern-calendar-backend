exports.isDate = ( value, { req, location, path } ) => {
    if (value === 0) return true;
    return !(!value || isNaN( new Date(value) ));
};
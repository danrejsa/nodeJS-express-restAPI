const Joi = require('joi');


const validateUsers = (api) => {
    const schema ={
        name:Joi.string().min(3).required(),
        age:Joi.number().integer().required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        phone:Joi.number().integer().min(8).required(),
        address:{
            city:Joi.string().required(),
            Street:Joi.string().required(),
            lat:Joi.number().integer().min(5).required(),
        },        
    };
    
    return  Joi.validate(api, schema);

    
}
 
module.exports = validateUsers;


const Joi = require('joi');


const validatePosts = (api) => {
    const schema ={
        title:Joi.string().required(),
        message:Joi.string().required() 
    };
    
    return  Joi.validate(api, schema);

    
}
 
module.exports = validatePosts;


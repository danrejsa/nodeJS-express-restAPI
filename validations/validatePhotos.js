const Joi = require('joi');

const validatePhotos = (api) => {
    const schema ={
        title:Joi.string().required(),
        img_url:Joi.string().required(),
        publisher:Joi.string().required() 
    };
    
    return  Joi.validate(api, schema);    
} 
module.exports = validatePhotos;


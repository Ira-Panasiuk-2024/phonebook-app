import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(\+380|380)[0-9]{9}$/)
    .messages({
      'string.pattern.base':
        'PhoneNumber should be in the format +380XXXXXXXXX or 380XXXXXXXXX',
      'any.required': 'PhoneNumber is required',
    }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email should be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'ContactType should be either work, home or personal',
      'any.required': 'ContactType is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).messages({
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^(\+380|380)[0-9]{9}$/)
    .messages({
      'string.pattern.base':
        'PhoneNumber should be in the format +380XXXXXXXXX or 380XXXXXXXXX',
    }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email should be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'ContactType should be either work, home or personal',
  }),
});

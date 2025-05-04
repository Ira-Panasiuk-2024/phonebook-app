import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email should be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should have at most 30 characters',
      'string.pattern.base':
        'Password should contain at least one lowercase letter, one uppercase letter, one number and one special character',
      'any.required': 'Password is required',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email should be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should have at most 30 characters',
      'string.pattern.base':
        'Password should contain at least one lowercase letter, one uppercase letter, one number and one special character',
      'any.required': 'Password is required',
    }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email should be a valid email address',
    'any.required': 'Email is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should have at most 30 characters',
      'string.pattern.base':
        'Password should contain at least one lowercase letter, one uppercase letter, one number and one special character',
      'any.required': 'Password is required',
    }),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

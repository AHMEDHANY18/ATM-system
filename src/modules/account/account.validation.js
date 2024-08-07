import Joi from 'joi';

export const depositValidation = Joi.object({
    amount: Joi.number().positive().max(5000).required().messages({
        'number.base': 'Amount should be a number',
        'number.positive': 'Amount should be a positive number',
        'number.max': 'Deposit amount cannot exceed 5000',
        'any.required': 'Amount is required'
    })
});

export const withdrawValidation = Joi.object({
    amount: Joi.number().positive().min(50).max(5000).required().messages({
        'number.base': 'Amount should be a number',
        'number.positive': 'Amount should be a positive number',
        'number.min': 'Withdrawal amount must be at least 50',
        'number.max': 'Withdrawal amount cannot exceed 5000',
        'any.required': 'Amount is required'
    })
});

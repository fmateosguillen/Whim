import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        next();
    }
};

export const msgExists = (field) => {
    return "The field "+field+" can't be empty"
};
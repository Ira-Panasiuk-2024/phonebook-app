import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidID(req, res, next) {
  const contactId = req.params.contactId;

  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'ID is not valid');
  }

  next();
}

import { Router } from 'express';

import { jsonParser } from '../constants/index.js';

import {
  getAllContactsController,
  getContactByIdController,
  deleteContactController,
  createContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidID, ctrlWrapper(getContactByIdController));

router.delete('/:contactId', isValidID, ctrlWrapper(deleteContactController));

router.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidID,
  upload.single('photo'),
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;

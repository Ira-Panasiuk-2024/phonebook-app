import { ContactsCollection } from '../db/models/contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'phoneNumber',
  filter = {},
  query = '',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const conditions = { userId };

  if (filter.contactType) {
    conditions.contactType = filter.contactType;
  }

  if (filter.isFavourite !== undefined) {
    conditions.isFavourite = filter.isFavourite;
  }

  if (query) {
    conditions.$or = [
      { name: { $regex: query, $options: 'i' } },
      { phoneNumber: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ];
  }

  const contactsQuery = ContactsCollection.find(conditions);

  const [contactsCount, contacts] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

export const createContact = async (contactData, userId) => {
  const contact = await ContactsCollection.create({
    ...contactData,
    userId,
  });

  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  options = {},
  userId,
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

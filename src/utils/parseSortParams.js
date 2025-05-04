import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (value) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(value);
  if (isKnownOrder) return value;
  return SORT_ORDER.ASC;
};

const parseSortBy = (value) => {
  const keysOfContacts = ['name', 'phoneNumber'];

  if (keysOfContacts.includes(value)) {
    return value;
  }

  return 'phoneNumber';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

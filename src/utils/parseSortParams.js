import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const allowedSortByFields = [
    'name',
    'phoneNumber',
    'email',
    'contactType',
    'isFavourite',
    'createdAt',
    'updatedAt',
  ];

  if (allowedSortByFields.includes(sortBy)) {
    return sortBy;
  }
  return 'phoneNumber';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

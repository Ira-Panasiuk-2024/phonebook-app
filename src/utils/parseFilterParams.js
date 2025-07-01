const parseContactType = (contactType) => {
  if (['work', 'home', 'personal'].includes(contactType)) {
    return contactType;
  }
  return undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;

  if (isFavourite === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  const filter = {};

  if (parsedContactType !== undefined) {
    filter.contactType = parsedContactType;
  }

  if (parsedIsFavourite !== undefined) {
    filter.isFavourite = parsedIsFavourite;
  }

  return filter;
};

export const keepCustomersNoteAndTagInfo = (store) => (next) => (action) => {
  const { norm } = action;
  if (!norm) return next(action);
  const { entities } = norm;
  if (!entities.customers) return next(action);
  const {
    entities: { customers: storeCustomers },
  } = store.getState();
  const mergeCustomers = Object.keys(entities.customers).reduce((acc, key) => {
    const entityCustomer = entities.customers[key];
    if (!storeCustomers[key]) return { ...acc, [key]: entityCustomer };
    if (!storeCustomers[key].notes && !storeCustomers[key].tags) return { ...acc, [key]: entityCustomer };
    return {
      ...acc,
      [key]: {
        ...entityCustomer,
        notes: storeCustomers[key].notes,
        tags: storeCustomers[key].tags,
      },
    };
  }, {});
  return next({
    ...action,
    norm: {
      ...action.norm,
      entities: {
        ...action.norm.entities,
        customers: mergeCustomers,
      },
    },
  });
};

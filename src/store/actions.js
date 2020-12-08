export const addBug = (description) => ({
  type: "ADD_BUG",
  payload: {
    description,
  },
});

export const removeBug = (id) => ({
  type: "REMOVE_BUG",
  payload: {
    id,
  },
});

export const resolveBug = (id) => ({
  type: "RESOLVE_BUG",
  payload: {
    id,
  },
});

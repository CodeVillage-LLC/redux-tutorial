export default (state = [], action) => {
  switch (action.type) {
    case "ADD_BUG":
      return [
        ...state,
        {
          description: action.payload.description,
          id: state.length + 1,
          resolved: false,
        },
      ];
      break;
    case "REMOVE_BUG":
      return state.filter((bug) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug) => {
        if (bug.id === action.payload.id) {
          bug.resolved = true;
        }

        return bug;
      });
    default:
      return state;
      break;
  }
};

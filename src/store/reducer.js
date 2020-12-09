export default (state = [], action) => {
  switch (action.type) {
    case "ADD_BUG":
      return [
        ...state,
        {
          id: state.length + 1,
          description: action.payload.description,
          resolve: false,
        },
      ];
      break;
    case "RESOLVE_BUG":
      return state.map((bug) => {
        if (bug.id === action.payload.id) bug.resolved = true;

        return bug;
      });
      break;
    case "REMOVE_BUG":
      return state.filter((bug) => bug.id !== action.payload.id);
      break;
    default:
      return state;
      break;
  }
};

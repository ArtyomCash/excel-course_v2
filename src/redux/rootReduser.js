export function rootReducer(state, action) {
  let prevState;
  // смотрю какое поле мне нужно изменить
  switch (action.type) {
    case 'TABLE_RESIZE':
      // для того что бы запомнить и записать размер колонки нужен id колонки и значение на которое поменялась
      // колонка value
      prevState = state.colState || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, colState: prevState };
    default:
      return state;
  }
}

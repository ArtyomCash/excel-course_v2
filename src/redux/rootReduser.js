// Pure Function (чистая функция)
// Reducer - просто должен менять состояние и больше ничекго не знать
import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  let prevState;
  let field;
  console.log('action >>', action);
  // смотрю какое поле мне нужно изменить
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      // для того что бы запомнить и записать размер колонки нужен id колонки и значение на которое поменялась
      // колонка value
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      // динамически получаем field => [field]
      return { ...state, [field]: prevState };
    default:
      return state;
  }
}

// создаю состояние хранения даннных на базе Redax
// rootReducer - функция которая возращает первый store

export function createStore(rootReducer, initialState) {
  // state - буду с ним взаимодействовать.
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  // listeners - будет содержать слушателей для Store
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unSubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return state;
    },
  };
}

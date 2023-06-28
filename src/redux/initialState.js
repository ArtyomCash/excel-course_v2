import { storage } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // сохраняет значение текущих ячеек {'0:1' : 'Запись в ячейке'}
  currentText: '', // поле отвечающее за текс который введён
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;

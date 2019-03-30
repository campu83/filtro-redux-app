import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';

import * as fromFiltroActions from './filter/filter.actions';

// Esta interface se usará en todos los contenedores que usen store de redux
export interface AppState {
    todos: Todo[];
    filtro: fromFiltroActions.filtrosValidos;
}

// Esta constante la usamos en app.module.ts para importar su uso.
export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};

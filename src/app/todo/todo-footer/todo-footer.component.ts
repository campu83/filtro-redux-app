import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  tareasPendientes: number;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }

  contarPendientes(todos: Todo[] ) {
    this.tareasPendientes = todos.filter( todo => !todo.completado ).length;
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos ) {

    const accion = new fromFiltro.SetFiltroAction( nuevoFiltro );
    this.store.dispatch( accion );
  }

  borrarCompletados() {
    const accion = new fromTodo.BorrarTodoCompletedAction();
    this.store.dispatch( accion );
  }
}

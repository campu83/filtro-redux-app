import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar al mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones ): Todo[] {
    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // Esto clona el estado anterior y le añade el todo al final.
            // Se hace así porque la teoría de redux dice que no se puede modificar el state actual
            // Debe generarse uno nuevo, por eso lo clonamos.
            return [...state, todo ];

        case fromTodo.TOGGLE_ALL_TODO:
            // si quisieramos marcarlos todos sin necesidad de recorrerlos lo podríamos hacer asi
            // return state.map(x => ({...x, completado: action.check}));
            return state.map( todoEdit => {
                if (todoEdit.completado !== action.completado) {
                    return { // Esto lo hacemos para crear el nuevo state ya que no devemos editar el anterior
                        ...todoEdit, // De esta forma clonamos el objeto menos el valor que editamos de completado.
                        completado: action.completado
                    };
                } else {
                    // Al ser estados que no son editados, devolvemos el mismo, solo mandamos nuevo lo editado.
                    return todoEdit;
                }
            });

        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if (todoEdit.id === action.id ) {
                    return { // Esto lo hacemos para crear el nuevo state ya que no devemos editar el anterior
                        ...todoEdit, // De esta forma clonamos el objeto menos el valor que editamos de completado.
                        completado: !todoEdit.completado
                    };
                } else {
                    // Al ser estados que no son editados, devolvemos el mismo, solo mandamos nuevo lo editado.
                    return todoEdit;
                }
            });

        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if (todoEdit.id === action.id ) {
                    return { // Esto lo hacemos para crear el nuevo state ya que no devemos editar el anterior
                        ...todoEdit, // De esta forma clonamos el objeto menos el valor que editamos de completado.
                        texto: action.texto
                    };
                } else {
                    // Al ser estados que no son editados, devolvemos el mismo, solo mandamos nuevo lo editado.
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
            // Devuelve un array con todos exceptuando los que sean igual el id.
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case fromTodo.BORRAR_ALL_COMPLETED_TODO:
            // Devuelve un array con todos exceptuando los que esten completados
            return state.filter( todoEdit => !todoEdit.completado);

        default:
            return state;
    }

}

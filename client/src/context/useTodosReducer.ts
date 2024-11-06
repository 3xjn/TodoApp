import { useReducer } from "react";
import { ITodoData, createTodo, deleteTodo, updateTodo } from "@services/api";

type AddTodoAction = {
    type: typeof actionTypes.ADD_TODO;
    payload: ITodoData;
};

type UpdateTodoAction = {
    type: typeof actionTypes.UPDATE_TODO;
    payload: Partial<ITodoData> & { id: string };
};

type DeleteTodoAction = {
    type: typeof actionTypes.DELETE_TODO;
    payload: string;
};

type SetTodosAction = {
    type: typeof actionTypes.SET_TODOS;
    payload: ITodoData[];
};

type SetSelectedTodoAction = {
    type: typeof actionTypes.SET_SELECTED_TODO;
    payload: string | undefined;
};

export type Action =
    | AddTodoAction
    | UpdateTodoAction
    | DeleteTodoAction
    | SetTodosAction
    | SetSelectedTodoAction;

export const actionTypes = {
    ADD_TODO: "ADD_TODO",
    UPDATE_TODO: "UPDATE_TODO",
    DELETE_TODO: "DELETE_TODO",
    SET_TODOS: "SET_TODOS",
    SET_SELECTED_TODO: "SET_SELECTED_TODO",
} as const;

interface State {
    todos: ITodoData[];
    selectedTodoId?: string;
}

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return { ...state, todos: [...state.todos, action.payload] };

        case actionTypes.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
            };

        case actionTypes.DELETE_TODO: {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            return {
                ...state,
                todos: updatedTodos,
                selectedTodoId:
                    state.selectedTodoId === action.payload
                        ? updatedTodos.at(-1)?.id
                        : state.selectedTodoId
            };
        }

        case actionTypes.SET_TODOS:
            return { ...state, todos: action.payload };

        case actionTypes.SET_SELECTED_TODO:
            return { ...state, selectedTodoId: action.payload };
    }
};

export const useTodosReducer = () => {
    const initialState: State = { todos: [] };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const onAddTodo = async (todo?: Partial<ITodoData>) => {
        const createdTodo = await createTodo({
            title: `New Todo`,
            content: "",
            ...todo,
        });

        if (!createdTodo) return;

        dispatch({ type: actionTypes.ADD_TODO, payload: createdTodo });
    };

    const onUpdateTodo = (id: string, updates: Partial<ITodoData>, save?: boolean) => {
        if (save) updateTodo(id, updates);
        dispatch({ type: actionTypes.UPDATE_TODO, payload: { id, ...updates } });
    };

    const onDeleteTodo = (id: string, save?: boolean) => {
        if (save) deleteTodo(id);
        dispatch({ type: actionTypes.DELETE_TODO, payload: id });
    };

    const onSetTodo = (todos: ITodoData[]) => {
        dispatch({ type: actionTypes.SET_TODOS, payload: todos });
    };

    const setSelectedTodo = (id: ITodoData["id"]) => {
        dispatch({ type: actionTypes.SET_SELECTED_TODO, payload: id });
    }

    return {
        todos: state.todos,
        selectedTodoId: state.selectedTodoId,
        setSelectedTodo,
        onAddTodo,
        onUpdateTodo,
        onDeleteTodo,
        onSetTodo,
        dispatch,
        actionTypes
    };
};
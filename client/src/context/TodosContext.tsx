import { createContext } from "react";
import { ITodoData } from "@services/api";
import { Action, useTodosReducer } from "./useTodosReducer";

export const TodosContext = createContext<
    | {
          todos: ITodoData[];
          setSelectedTodo: (id: ITodoData["id"]) => void;
          selectedTodoId?: string;
          onAddTodo: (todo?: Partial<ITodoData>) => Promise<void>;
          onUpdateTodo: (
              id: string,
              updates: Partial<ITodoData>,
              save?: boolean
          ) => void;
          onDeleteTodo: (id: string, save?: boolean) => void;
          onSetTodo: (todos: ITodoData[]) => void;
          dispatch: React.Dispatch<Action>;
      }
    | undefined
>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const {
        todos,
        selectedTodoId,
        setSelectedTodo,
        onAddTodo,
        onUpdateTodo,
        onDeleteTodo,
        onSetTodo,
        dispatch,
    } = useTodosReducer();

    return (
        <TodosContext.Provider
            value={{
                todos,
                selectedTodoId,
                setSelectedTodo,
                onAddTodo,
                onUpdateTodo,
                onDeleteTodo,
                onSetTodo,
                dispatch,
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

import { Action, actionTypes } from '@root/context/useTodosReducer';
import { getData } from '@root/services/api';
import { useCallback } from 'react';

function useFetchTodos(dispatch: React.Dispatch<Action>, selectedTodoId: string | undefined) {
    const fetchTodos = useCallback(async () => {
        const data = await getData();
        
        if (selectedTodoId === data[0]?.id) return;
        
        dispatch({
            type: actionTypes.SET_TODOS,
            payload: data,
        });
        
        if (data?.length > 0) {
            dispatch({
                type: actionTypes.SET_SELECTED_TODO,
                payload: data[0]?.id,
            });
        }
    }, [dispatch, selectedTodoId]);

    return fetchTodos;
}

export default useFetchTodos;
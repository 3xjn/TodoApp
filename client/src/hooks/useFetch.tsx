import { Action, actionTypes } from '@root/context/useTodosReducer';
import { getData } from '@root/services/api';
import { useCallback, useRef, useState } from 'react';

function useFetchTodos(dispatch: React.Dispatch<Action>, selectedTodoId: string | undefined) {
    const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'done'>('idle');
    const fetchInProgress = useRef(false);

    const fetchTodos = useCallback(async () => {
        if (fetchInProgress.current || fetchState !== 'idle') {
            return;
        }
        
        try {
            fetchInProgress.current = true;
            setFetchState('loading');
            
            const data = await getData();
            
            if (selectedTodoId === data[0]?.id) {
                setFetchState('done');
                return;
            }
            
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
            setFetchState('done');
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            setFetchState('idle');
        } finally {
            fetchInProgress.current = false;
        }
    }, [fetchState, dispatch, selectedTodoId]);

    return { fetchTodos, fetchState };
}

export default useFetchTodos;
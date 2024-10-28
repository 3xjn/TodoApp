export interface ITodoData {
    readonly id: string;
    title: string;
    content: string;
    order?: number;
}

function getBearerToken(): string | null {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        console.error("No auth token found");
        throw new Error("Failed to find an authorization token.");
    }
    return token;
}

async function fetchTodos(): Promise<ITodoData[]> {
    const response = await fetch("/api/Todo", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch todos: " + response.statusText);
    }

    const todos: ITodoData[] = await response.json();

    // Sort and map todos based on order
    return todos
        .sort((a, b) => {
            const aOrder = a.order ?? Number.MAX_SAFE_INTEGER; // Fallback to max if undefined
            const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;
            return aOrder - bOrder;
        })
        .map((todo, index) => ({
            ...todo,
            order: todo.order ?? index, // Assign index if order is undefined
        }));
}

// Create a new todo for the logged-in user
async function createTodo(todo: Omit<Partial<ITodoData>, "id">): Promise<ITodoData | false> {
    const response = await fetch("/api/Todo", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        console.error("[create]: response was not ok", response.statusText);
        return false;
    }

    console.log("[create]: success!");
    return await response.json() as ITodoData;
}

// Update an existing todo
async function updateTodo(id: string, todo: Partial<ITodoData>): Promise<void> {
    const response = await fetch(`/api/Todo/update`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...todo }),
    });

    if (!response.ok) {
        console.error("[update]: response was not ok", response.statusText);
        throw new Error("Failed to update todo: " + response.statusText);
    }

    console.log("[update]: success!");
}

// Delete a todo by ID
async function deleteTodo(id: string): Promise<void> {
    const response = await fetch(`/api/Todo/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("[delete] failed to delete:", id, response.statusText);
        throw new Error("Failed to delete todo: " + response.statusText);
    }

    console.log("[delete] successfully deleted todo.");
}

export {
    fetchTodos as getData,
    updateTodo,
    deleteTodo,
    createTodo,
};
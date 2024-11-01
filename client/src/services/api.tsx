import Cookies from 'universal-cookie';

const cookies = new Cookies();

export interface ITodoData {
    readonly id: string;
    title: string;
    content: string;
    order?: number;
}

function getBearerToken(): string | null {
    const token = cookies.get("authToken");
    if (!token) {
        console.error("No auth token found");
        throw new Error("Failed to find an authorization token.");
    }
    return token;
}

async function getData(): Promise<ITodoData[]> {
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
            const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
            const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;
            return aOrder - bOrder;
        })
        .map((todo, index) => ({
            ...todo,
            order: todo.order ?? index,
        }));
}

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
    const response = await fetch(`/api/Todo?id=${id}`, {
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
    getData,
    updateTodo,
    deleteTodo,
    createTodo
};
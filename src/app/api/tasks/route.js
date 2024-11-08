// src/app/api/tasks/route.js

// Dummy in-memory storage for tasks. This will reset every time the server restarts.
let tasks = [];

export async function GET() {
    return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(request) {
    const newTask = await request.json();
    tasks.push(newTask);
    return new Response(JSON.stringify(newTask), { status: 201 });
}

export async function PUT(request) {
    // Using request.nextUrl to get query parameters
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    
    if (!title) {
        return new Response(JSON.stringify({ message: 'Title is required' }), { status: 400 });
    }

    const updatedTask = await request.json();
    const index = tasks.findIndex(task => task.title === title);

    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        return new Response(JSON.stringify(tasks[index]), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Task not found' }), { status: 404 });
    }
}

export async function DELETE(request) {
    const { title } = new URL(request.url).searchParams;
    tasks = tasks.filter(task => task.title !== title);
    return new Response(null, { status: 204 });
}

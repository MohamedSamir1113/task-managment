// Dummy in-memory storage for tasks. This will reset every time the server restarts.
let tasks = [];

export default function handler(req, res) {
    const { method } = req;
    const { title } = req.query;

    switch (method) {
        case 'GET':
            res.status(200).json(tasks);
            break;
        case 'POST':
            const newTask = req.body;
            tasks.push(newTask);
            res.status(201).json(newTask);
            break;
        case 'PUT':
            const index = tasks.findIndex(task => task.title === title);
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...req.body };
                res.status(200).json(tasks[index]);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
            break;
        case 'DELETE':
            tasks = tasks.filter(task => task.title !== title);
            res.status(204).end();
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

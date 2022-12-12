import express, { Application, Request, Response } from 'express';

const PORT = 3000;
const app: Application = express();

//add routing

app.get('/', (req: Request, res: Response) => {
    res.json({ Message: 'h' });
});

app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;

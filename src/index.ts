import express, { Application, request, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const PORT = 3000;

//create instance server
const app: Application = express();
//HTTP middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'to many requests!',
    })
);

//add routing
app.get('/', (req: Request, res: Response) => {
    res.json({ Message: 'h' });
});

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ Message: 'hello from post', data: request.body });
});

app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;

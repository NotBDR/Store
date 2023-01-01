import express, {
    Application,
    request,
    Request,
    response,
    Response,
} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database';
import routes from './routes';
const PORT = config.port;

//create instance server
const app: Application = express();
//HTTP middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'to many requests!',
    })
);

app.use('/api', routes);
//add routing
app.get('/', (req: Request, res: Response) => {
    res.json({ Message: 'hello world!' });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ massage: 'Check the route!' });
});



app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;

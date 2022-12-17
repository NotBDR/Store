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

const PORT = config.port;

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
    throw new Error('Error');

    res.json({ Message: 'h' });
});

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ Message: 'hello from post', data: request.body });
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({ massage: 'Check the route!' });
});

//test db
// connection using created pool
db.connect(function (err, client, done) {
    return client
        .query('SELECT NOW()')
        .then((res) => {
            done();
            console.log(res.rows);
        })
        .catch((err) => {
            done();
            console.log(err.stack);
        });
});

// pool shutdown
db.end();

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;

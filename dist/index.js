"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const PORT = config_1.default.port;
//create instance server
const app = (0, express_1.default)();
//HTTP middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'to many requests!',
}));
app.use('/api', routes_1.default);
//add routing
app.get('/', (req, res) => {
    res.json({ Message: 'hello world!' });
});
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({ massage: 'Check the route!' });
});
app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});
exports.default = app;

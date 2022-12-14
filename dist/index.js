"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = 3000;
//create instance server
const app = (0, express_1.default)();
//HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
//add routing
app.get('/', (req, res) => {
    res.json({ Message: 'h' });
});
app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});
exports.default = app;

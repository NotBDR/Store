"use strict";
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (
                    k !== 'default' &&
                    Object.prototype.hasOwnProperty.call(mod, k)
                )
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importStar(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const helmet_1 = __importDefault(require('helmet'));
const express_rate_limit_1 = __importDefault(require('express-rate-limit'));
const error_middleware_1 = __importDefault(
    require('./middleware/error.middleware')
);
const PORT = 3000;
//create instance server
const app = (0, express_1.default)();
//HTTP middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use(
    (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'to many requests!',
    })
);
//add routing
app.get('/', (req, res) => {
    res.json({ Message: 'h' });
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ Message: 'hello from post', data: express_1.request.body });
});
app.use((_req, res) => {
    res.status(404).json({ massage: 'Check the route!' });
});
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});
exports.default = app;

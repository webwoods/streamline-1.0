"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var pgPromise = require("pg-promise");
var mysql = require("mysql2/promise");
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var fs = require("fs/promises");
var uuid_1 = require("uuid");
var orm_config_1 = require("../config/orm.config");
var role_1 = require("../roles/enum/role");
var db = (0, orm_config_1.getDbConfig)({
    db: {},
    entities: [],
});
var connectionConfig = {
    user: (_a = process.env['DB_USERNAME']) !== null && _a !== void 0 ? _a : 'postgres',
    password: (_b = process.env['DB_PASSWORD']) !== null && _b !== void 0 ? _b : 'pwd@kodi',
    database: (_c = process.env['DB_NAME']) !== null && _c !== void 0 ? _c : 'streamline',
    host: (_d = process.env['DB_HOST']) !== null && _d !== void 0 ? _d : 'localhost',
};
var pgConnectionConfig = __assign(__assign({}, connectionConfig), { port: Number(process.env['DB_PORT']) || 5432 });
var mysqlConnectionConfig = __assign(__assign({}, connectionConfig), { port: Number(process.env['DB_PORT']) || 3306 });
var connection;
var generateRandomValue = function (length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
var hashedPassword = function () { return __awaiter(void 0, void 0, void 0, function () {
    var randomPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                randomPassword = generateRandomValue(12);
                return [4 /*yield*/, bcrypt.hash(randomPassword, 10)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var hashedVerificationCode = function () { return __awaiter(void 0, void 0, void 0, function () {
    var randomVerificationCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                randomVerificationCode = generateRandomValue(8);
                return [4 /*yield*/, bcrypt.hash(randomVerificationCode, 10)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getRandomRole = function () {
    var roles = Object.values(role_1.UserRoles);
    var randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
};
var generateScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
    return __generator(this, function (_24) {
        switch (_24.label) {
            case 0:
                _0 = (_z = "\n    -- Insert users\n    INSERT INTO public.user (id, \"createdAt\", \"updatedAt\", username, email, password, name, \"roleId\", verified)\n    VALUES\n    (".concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'superadmin', 'superadmin@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 1:
                _1 = (_y = _0.apply(_z, [_24.sent(), "', 'Will Ferrel', (SELECT id FROM public.role WHERE name = "]).concat(role_1.UserRoles.SUPERADMIN, "), true),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'admin', 'superadmin@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 2:
                _2 = (_x = _1.apply(_y, [_24.sent(), "', 'Dennis Berckham', (SELECT id FROM public.role WHERE name = "]).concat(role_1.UserRoles.ADMIN, "), true),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'john_doe', 'john_doe@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 3:
                _3 = (_w = _2.apply(_x, [_24.sent(), "', 'John Doe', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), true),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'jane_smith', 'jane_smith@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 4:
                _4 = (_v = _3.apply(_w, [_24.sent(), "', 'Jane Smith', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'alice_wonderland', 'alice_wonderland@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 5:
                _5 = (_u = _4.apply(_v, [_24.sent(), "', 'Alice Wonderland', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'bob_marley', 'bob_marley@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 6:
                _6 = (_t = _5.apply(_u, [_24.sent(), "', 'Bob Marley', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'emma_watson', 'emma_watson@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 7:
                _7 = (_s = _6.apply(_t, [_24.sent(), "', 'Emma Watson', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'john_smith', 'john_smith@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 8:
                _8 = (_r = _7.apply(_s, [_24.sent(), "', 'John Smith', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'jane_doe', 'jane_doe@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 9:
                _9 = (_q = _8.apply(_r, [_24.sent(), "', 'Jane Doe', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'bob_wonderland', 'bob_wonderland@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 10:
                _10 = (_p = _9.apply(_q, [_24.sent(), "', 'Bob Wonderland', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'alice_marley', 'alice_marley@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 11:
                _11 = (_o = _10.apply(_p, [_24.sent(), "', 'Alice Marley', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), 'emma_doe', 'emma_doe@streamline.org', '")).concat;
                return [4 /*yield*/, hashedPassword()];
            case 12:
                _12 = (_m = _11.apply(_o, [_24.sent(), "', 'Emma Doe', (SELECT id FROM public.role WHERE name = "]).concat(getRandomRole(), "), false);\n\n    -- Insert roles\n    INSERT INTO public.role (id, \"createdAt\", \"updatedAt\", name)\n    VALUES\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.SUPERADMIN, "'),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.ADMIN, "'),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.DIRECTOR, "'),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.EMPLOYEE, "'),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.PROCUREMENT_STAFF, "'),\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(),'").concat(role_1.UserRoles.STORE_STAFF, "');\n\n    -- Insert verification codes\n    INSERT INTO public.verification_code (id, \"createdAt\", \"updatedAt\", user_id, code)\n    VALUES\n    (").concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'superadmin'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 13:
                _13 = (_l = _12.apply(_m, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'admin'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 14:
                _14 = (_k = _13.apply(_l, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_doe'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 15:
                _15 = (_j = _14.apply(_k, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_smith'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 16:
                _16 = (_h = _15.apply(_j, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_wonderland'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 17:
                _17 = (_g = _16.apply(_h, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_marley'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 18:
                _18 = (_f = _17.apply(_g, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_watson'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 19:
                _19 = (_e = _18.apply(_f, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_smith'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 20:
                _20 = (_d = _19.apply(_e, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_doe'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 21:
                _21 = (_c = _20.apply(_d, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_wonderland'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 22:
                _22 = (_b = _21.apply(_c, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_marley'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 23:
                _23 = (_a = _22.apply(_b, [_24.sent(), "'),\n    ("]).concat((0, uuid_1.v4)(), ", NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_doe'), '")).concat;
                return [4 /*yield*/, hashedVerificationCode()];
            case 24: return [2 /*return*/, _23.apply(_a, [_24.sent(), "');\n  "])];
        }
    });
}); };
var printScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var script, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, generateScript()];
            case 1:
                script = _a.sent();
                return [4 /*yield*/, fs.writeFile('libs/core/src/sql/script.sql', script, 'utf-8')];
            case 2:
                _a.sent();
                console.log('Script generated successfully');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error generating script:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var runScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var script, pgp, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, 9, 11]);
                return [4 /*yield*/, generateScript()];
            case 1:
                script = _a.sent();
                // Write script to a file
                return [4 /*yield*/, fs.writeFile('script.sql', script, 'utf-8')];
            case 2:
                // Write script to a file
                _a.sent();
                if (!(db.type === 'postgres')) return [3 /*break*/, 3];
                pgp = pgPromise();
                connection = pgp(pgConnectionConfig);
                return [3 /*break*/, 6];
            case 3:
                if (!(db.type === 'mysql')) return [3 /*break*/, 5];
                return [4 /*yield*/, mysql.createConnection(mysqlConnectionConfig)];
            case 4:
                connection = _a.sent();
                return [3 /*break*/, 6];
            case 5: throw new Error('Invalid database type. Use DB=postgres or DB=mysql');
            case 6: 
            // Run the SQL script
            return [4 /*yield*/, connection.none(script)];
            case 7:
                // Run the SQL script
                _a.sent();
                console.log('Script executed successfully');
                return [3 /*break*/, 11];
            case 8:
                error_2 = _a.sent();
                console.error('Error executing script:', error_2);
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, connection.end()];
            case 10:
                _a.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
// Run the script
// runScript();
printScript();

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConfig = void 0;
function getDbConfig(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var db = _a.db, entities = _a.entities;
    var dbType = (_c = (_b = db.type) !== null && _b !== void 0 ? _b : process.env['DB']) !== null && _c !== void 0 ? _c : 'postgres';
    var commonConfig = {
        type: dbType,
        synchronize: true,
        migrationsRun: false,
        migrations: [__dirname + '/migrations/*{.js,.ts}'],
        subscribers: [],
        entities: entities,
    };
    var pgConfig = {
        type: 'postgres',
        host: (_d = process.env['DB_HOST']) !== null && _d !== void 0 ? _d : 'localhost',
        port: Number(process.env['DB_PORT']) || 5432,
        username: (_e = process.env['DB_USERNAME']) !== null && _e !== void 0 ? _e : 'postgres',
        password: (_f = process.env['DB_PASSWORD']) !== null && _f !== void 0 ? _f : 'postgres',
        database: (_g = process.env['DB_NAME']) !== null && _g !== void 0 ? _g : 'streamline',
    };
    var mysqlConfig = {
        type: 'mysql',
        host: (_h = process.env['DB_HOST']) !== null && _h !== void 0 ? _h : 'localhost',
        port: Number(process.env['DB_PORT']) || 3306,
        username: (_j = process.env['DB_USERNAME']) !== null && _j !== void 0 ? _j : 'streamline',
        password: (_k = process.env['DB_PASSWORD']) !== null && _k !== void 0 ? _k : 'streamline',
        database: (_l = process.env['DB_NAME']) !== null && _l !== void 0 ? _l : 'streamline',
    };
    switch (dbType) {
        case 'postgres':
            console.log('Using postgres connection');
            return __assign(__assign({}, commonConfig), pgConfig);
        case 'mysql':
            console.log('Using mysql connection');
            return __assign(__assign({}, commonConfig), mysqlConfig);
        default:
            console.log('Using postgres connection');
            return __assign(__assign({}, commonConfig), pgConfig);
    }
}
exports.getDbConfig = getDbConfig;

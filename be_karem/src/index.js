"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var mongodb_1 = require("mongodb");
var jsonwebtoken_1 = require("jsonwebtoken");
var crypto_1 = require("crypto");
var app = (0, express_1.default)();
var corsOptions = {
    origin: 'http://localhost:5173', // Domena frontendu
    methods: ['GET', 'POST'], // Metody HTTP dozwolone
    allowedHeaders: ['Content-Type', 'Authorization'] // Nagłówki dozwolone
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Połączenie z MongoDB
var client = new mongodb_1.MongoClient("mongodb://mongo:27017");
var collection;
client.connect().then(function () {
    var db = client.db("mydatabase");
    collection = db.collection("users");
    console.log('collection', collection);
    console.log("Connected to MongoDB");
});
var PORT = 5175;
var SECRET_KEY = 'secret_key';
// Endpointy
app.post("/add_user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collection.insertOne({ name: req.body.name })];
            case 1:
                result = _a.sent();
                res.json({ id: result.insertedId });
                return [2 /*return*/];
        }
    });
}); });
app.get("/get_users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collection.find({}, { projection: { _id: 0, name: 1 } }).toArray()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
// Endpoint logowania użytkownika
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, user, hash, passwordHash, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, password = _a.password;
                if (!name || !password) {
                    return [2 /*return*/, res.status(400).json({ error: "Name and password are required" })];
                }
                return [4 /*yield*/, collection.findOne({
                        $or: [
                            { name: name },
                            { email: name }
                        ]
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ error: "Nie znaleziono podanego użytkownika." })];
                }
                hash = crypto_1.default.createHash('sha256');
                hash.update(password + user.salt);
                passwordHash = hash.digest('hex');
                if (passwordHash !== user.password) {
                    return [2 /*return*/, res.status(401).json({ error: "Nieprawdłowe hasło." })];
                }
                console.log('Logged in as:', user.name);
                token = jsonwebtoken_1.default.sign({
                    id: user._id, name: user.name, role: user.role,
                    email: user.email,
                }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ token: token });
                return [2 /*return*/];
        }
    });
}); });
// Endpoint rejestracji użytkownika
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, password, email, checkUserName, checkUserEmail, salt, hash, passwordHash, newUser, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, password = _a.password, email = _a.email;
                return [4 /*yield*/, collection.findOne({ name: name_1 })];
            case 1:
                checkUserName = _b.sent();
                return [4 /*yield*/, collection.findOne({ email: email })];
            case 2:
                checkUserEmail = _b.sent();
                if (checkUserName || checkUserEmail) {
                    return [2 /*return*/, res.status(400).json({ error: 'Użytkownik o podanej nazwie lub emailu już istnieje.' })];
                }
                salt = crypto_1.default.randomBytes(8).toString('hex');
                hash = crypto_1.default.createHash('sha256');
                hash.update(password + salt);
                passwordHash = hash.digest('hex');
                newUser = { name: name_1, password: passwordHash, salt: salt, email: email, role: 'student' };
                return [4 /*yield*/, collection.insertOne(newUser)];
            case 3:
                result = _b.sent();
                if (result.insertedId) {
                    console.log('Registered user:', newUser.name);
                    res.json({ id: result.insertedId });
                }
                else {
                    res.status(500).json({ error: 'User registration failed' });
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('Error during registration:', error_1);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var authenticateToken = function (requiredRoles) {
    if (requiredRoles === void 0) { requiredRoles = []; }
    return function (req, res, next) {
        var authHeader = req.headers['authorization'];
        var token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return res.status(401).json({ error: 'Token is missing' });
        jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, user) {
            if (err)
                return res.status(403).json({ error: 'Invalid token' });
            req.user = user;
            if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
                return res.status(403).json({ error: 'Access denied: insufficient role' });
            }
            if (req.originalUrl !== '/verify-token')
                console.log("User ".concat(user.name, " (").concat(user.id, ") accessed ").concat(req.originalUrl));
            next();
        });
    };
};
// Endpoint for authorization
app.get('/verify-token', authenticateToken(), function (req, res) {
    res.json({
        message: 'Token is valid',
        user: req.user,
    });
});
// Endpoint for get all user data
app.get('/get-user-data', authenticateToken(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collection.findOne({ _id: req.user.id })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
// Endpoint for get all users data
app.get('/get-all-users-data', authenticateToken(['admin']), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collection.find({}).toArray()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
// Endpoint api change user role
var mongodb_2 = require("mongodb"); // Import ObjectId
app.post('/change-role', authenticateToken(['admin']), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, role, newObjectId, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log(req.body);
                _a = req.body, id = _a.id, role = _a.role;
                // Sprawdź, czy id jest prawidłowym ObjectId
                if (!mongodb_2.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid user ID' })];
                }
                newObjectId = new mongodb_2.ObjectId(id);
                return [4 /*yield*/, collection.findOneAndUpdate({ _id: newObjectId }, // Konwersja na ObjectId
                    { $set: { role: role } }, { returnDocument: 'after' } // Zwraca zaktualizowany dokument
                    )];
            case 1:
                user = _b.sent();
                if (!user.value) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                console.log('User role changed:', user.value);
                res.json(user.value);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error('Error changing user role:', error_2);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/run', function (req, res) {
    try {
        var code = req.body.code;
        fs_1.default.writeFileSync('script.py', code);
        (0, child_process_1.exec)('python3 script.py', function (error, stdout, stderr) {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.json({
                stdout: stdout,
                stderr: stderr
            });
        });
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
});
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});

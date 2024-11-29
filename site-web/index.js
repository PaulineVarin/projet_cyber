const path = require('path');
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const memoryStore = new session.MemoryStore();

app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/view'));
app.use(express.static('static'));
app.use(session({
    secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new Keycloak({
    store: memoryStore,
});

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

app.get('/', (req, res) => res.redirect('/home'));

const parseToken = raw => {
    if (!raw || typeof raw !== 'string') return null;

    try {
        raw = JSON.parse(raw);
        const token = raw.id_token ? raw.id_token : raw.access_token;
        const content = token.split('.')[1];
        console.log("ID token");
        console.log(raw.id_token);
        console.log("Acces Token");
        console.log(raw.access_token);

        return JSON.parse(Buffer.from(content, 'base64').toString('utf-8'));
    } catch (e) {
        console.error('Error while parsing token: ', e);
    }
};

app.get('/home', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('home', {
        user: embedded_params,
    });
});

app.get('/login', keycloak.protect(), (req, res) => {
    return res.redirect('home');
});

app.get('/ue1/read', keycloak.enforcer(['ue_1:read'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.get('/ue1/write', keycloak.enforcer(['ue_1:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});

app.get('/ue1/validate', keycloak.enforcer(['ue_1:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.get('/ue2/read', keycloak.enforcer(['ue_2:read'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.get('/ue2/write', keycloak.enforcer(['ue_2:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});

app.get('/ue2/validate', keycloak.enforcer(['ue_2:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.get('/ue3/read', keycloak.enforcer(['ue_3:read'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.get('/ue3/write', keycloak.enforcer(['ue_3:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});

app.get('/ue3/validate', keycloak.enforcer(['ue_3:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    return res.status(200).end('success');
});


app.use((req, res, next) => {
    return res.status(404).end('Not Found');
});

app.use((err, req, res, next) => {
    return res.status(req.errorCode ? req.errorCode : 500).end(req.error ? req.error.toString() : 'Internal Server Error');
});

const server = app.listen(3000, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Application running at http://%s:%s', host, port);
});

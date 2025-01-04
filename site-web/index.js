const path = require('path');
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const jwt = require('jsonwebtoken');
const { permission } = require('process');

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

app.use('/site-web/public', express.static('public'));


app.get('/', (req, res) => res.redirect('/home'));

const parseToken = raw => {
    if (!raw || typeof raw !== 'string') return null;

    try {
        raw = JSON.parse(raw);
        const token = raw.id_token ? raw.id_token : raw.access_token;
        const content = token.split('.')[1];
        return JSON.parse(Buffer.from(content, 'base64').toString('utf-8'));
    } catch (e) {
        console.error('Error while parsing token: ', e);
    }
};


const getTokenRoles = raw => {
    if (!raw || typeof raw !== 'string') return null;

    try {
        raw = JSON.parse(raw);
        const token = raw.id_token ? raw.id_token : raw.access_token;
        const content = token.split('.')[1];
        tabRoleUser = getRolesFromToken(raw.access_token)
        return tabRoleUser
    } catch (e) {
        console.error('Error get roles: ', e);
    }
};

app.get('/home', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const detailsRoles = getTokenRoles(req.session['keycloak-token']);
    liste_roles = ""
    for (let item of detailsRoles) {
        liste_roles = liste_roles + item
        liste_roles = liste_roles + '-'
    }
    
    res.cookie('role_user', liste_roles, { expires: new Date(Date.now() + 900000), httpOnly: false });
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name.split(' ')[0];
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('home', {
        user: embedded_params
    });
});

app.get('/login', keycloak.protect(), (req, res) => {
    return res.redirect('home');
});

/*PARTIE PAULINE*/
/*---------------------------------*/
function getRolesFromToken(token) {
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
        throw new Error('Invalid token');
    }

    const realmRoles = decodedToken.realm_access?.roles || [];
    return realmRoles;
}




//Lecture notes
app.get('/ue1/lecture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('lecture_notes', {
        user: embedded_params,
    });
});

app.get('/ue2/lecture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('lecture_notes', {
        user: embedded_params,
    });
});



app.get('/ue3/lecture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('lecture_notes', {
        user: embedded_params,
    });
});

//Ecriture notes
app.get('/ue1/ecriture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('ecriture_notes', {
        user: embedded_params,
    });
});

app.get('/ue2/ecriture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('ecriture_notes', {
        user: embedded_params,
    });
});

app.get('/ue3/ecriture_notes', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('ecriture_notes', {
        user: embedded_params,
    });
});

//Validation notes
app.get('/ue1/validate', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('validate', {
        user: embedded_params,
    });
});

app.get('/ue2/validate', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('validate', {
        user: embedded_params,
    });
});

app.get('/ue3/validate', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
    }

    res.render('validate', {
        user: embedded_params,
    });
});


/*---------------------------------*/

app.get('/ue1/read', keycloak.enforcer(['ue_1:read'],{
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '1', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('lecture_notes')
});


app.get('/ue2/read', keycloak.enforcer(['ue_2:read'],{
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '2', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('lecture_notes')
});


app.get('/ue3/read', keycloak.enforcer(['ue_3:read'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '3', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('lecture_notes')
});


app.get('/ue1/write', keycloak.enforcer(['ue_1:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '1', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('ecriture_notes')
});


app.get('/ue2/write', keycloak.enforcer(['ue_2:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '2', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('ecriture_notes')
});

app.get('/ue3/write', keycloak.enforcer(['ue_3:write'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '3', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('ecriture_notes')
});

app.get('/ue1/validate', keycloak.enforcer(['ue_1:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '1', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('validate')
});

app.get('/ue2/validate', keycloak.enforcer(['ue_2:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '2', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('validate')
});

app.get('/ue3/validate', keycloak.enforcer(['ue_3:validate'], {
    resource_server_id: 'application-universite'
}), (req, res) => {
    res.cookie('number_ue', '3', { expires: new Date(Date.now() + 900000), httpOnly: false });
    return res.status(200).redirect('validate')
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

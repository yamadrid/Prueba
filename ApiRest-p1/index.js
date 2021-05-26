const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let answer = {
    error: false,
    code: 200,
    message: ''
};

app.get('/', (req, res) => {
    answer = {
        error: true,
        code: 200,
        message: 'Punto de inicio'
    };
    res.send(answer);
});

app.route('/users').get((req, res) => {
    answer = {
        error: false,
        code: 200,
        message: ''
    };
    if (user.name === '' || user.last_name === '') {
        answer = {
            error: true,
            code: 501,
            message: 'El usuario no ha sido creado'
        };
    } else {
        answer = {
            error: false,
            code: 200,
            message: 'respuesta del usuario',
            answer: user
        };
    }
    res.send(answer);
}).post('/user', (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.last_name) {
        answer = {
            error: true,
            code: 502,
            message: 'El campo nombre y apellido son requeridos'
        };
    } else {
        if (user.id !== '' || user.name !== '' || user.last_name !== '') {
            answer = {
                error: true,
                code: 503,
                message: 'El usuario ya fue creado previamente'
            };
        } else {
            user = {
                name: req.body.name,
                last_name: req.body.last_name
            };
            answer = {
                error: false,
                code: 200,
                message: 'user creado',
                answer: user
            };
        }
    }

    res.send(answer);
}).put('/user', (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.last_name) {
        answer = {
            error: true,
            code: 502,
            message: 'El campo nombhre y apellido son requeridos'
        };
    } else {
        if (user.id !== '' || user.name === '' || user.last_name === '') {
            answer = {
                error: true,
                code: 501,
                message: 'El usuario no ha sido creado'
            };
        } else {
            user = {
                name: req.body.name,
                last_name: req.body.last_name
            };
            answer = {
                error: false,
                code: 200,
                message: 'usuario actualizado',
                answer: user
            };
        }
    }

    res.send(answer);
}).delete('/user', (req, res) => {
    if (user.id !== '' || user.name === '' || user.last_name === '') {
        answer = {
            error: true,
            code: 501,
            message: 'El usuario no ha sido creado'
        };
    } else {
        answer = {
            error: false,
            code: 200,
            message: 'usuario eliminado'
        };
        user = {
            name: '',
            last_name: ''
        };
    }
    res.send(answer);
});

app.use((req, res, next) => {
    answer = {
        error: true,
        code: 404,
        message: 'URL no encontrada'
    };
    res.status(404).send(answer);
});

app.listen(3000, () => { console.log("Servidor Inicializado"); })
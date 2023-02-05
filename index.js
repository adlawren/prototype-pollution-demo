const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const DeepExtend = require('deep-extend');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());

defaultSettings = {
    homepage: {
        greeting: 'Greetings visitor,',
        introduction: 'Welcome to the site!'
    }
};

settings = defaultSettings;

function updateSettings(newSettings) {
    mergedSettings = {};
    DeepExtend(mergedSettings, defaultSettings, newSettings);

    settings = mergedSettings;
}

app.get('/', function(req, res) {
    res.render('index', { greeting: settings.homepage.greeting, introduction: settings.homepage.introduction });
});

app.get('/config', function(req, res) {
    res.render('config', { currentGreeting: settings.homepage.greeting });
});

app.post('/config', function(req, res) {
    updateSettings(req.body);

    res.sendStatus(200);
});

app.listen(3000);

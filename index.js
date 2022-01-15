import express from 'express';
import router from './routes/router.js';

const PORT = 8888;
const app = express();
app.use(express.static('static'));
app.use(express.json());
app.use(router);

function startApp() {
    try {
        app.listen(PORT, () => console.log('Server started on port: ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();

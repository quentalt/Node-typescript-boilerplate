import {createServer} from 'http';
import {app} from './app';
import {sequelize} from "./config/sequelize";

const port = process.env.PORT || 5000;

sequelize.sync().then(() => {
    createServer(app).listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});


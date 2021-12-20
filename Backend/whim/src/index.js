import express from "express";
import cors from "cors";
import passport from "./services/passport";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";
import routes from './routes/index';
import mongoose from "mongoose";
import 'dotenv/config';
import { initialization } from "./services/initialization";

const app = express();
app.use(cors());

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(morgan('dev'));
morganBody(app);

app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/category', routes.category);
app.use('/product', routes.product);
app.use('/cart', routes.cart);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,  useUnifiedTopology: true}, err => {
    if (err) {
        console.log(`Error connecting to database: ${JSON.stringify(err)}`);
    } else {
        console.log(`Successfully connected to database ${process.env.DB_URI}`);
        app.listen(process.env.PORT, () =>
            console.log (`App listening at port ${process.env.PORT}`)
        );
        initialization.createAdmin();
        initialization.createCategoryOthers();
    }
});

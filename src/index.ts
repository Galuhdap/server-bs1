import express , {Express ,Request , Response} from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import AdminController from './controllers/users/AdminController';
import VerifyAuth from './middleware/VerifyAuth';
import { AuthIndex } from './controllers/Auth/IndexAuth';
import { TransaksiIndex } from './controllers/Transaksi/IndexTransaksi';
import { SampahIndex } from './controllers/Sampah/IndexSampah';
import { UserIndex } from './controllers/users/IndexUsers';



dotenv.config();

const app: Express= express()
const port = process.env.APP_PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(new AdminController().router);

app.use(AuthIndex());
app.use(SampahIndex());
app.use(TransaksiIndex());
app.use(UserIndex());
app.use(new VerifyAuth().router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
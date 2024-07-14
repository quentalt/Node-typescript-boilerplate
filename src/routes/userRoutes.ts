import {Router} from 'express';
import {User} from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface AuthRequest extends Request {
    user?: any;
}

export const userRouterFactory = () => Router()

    .get('/users', async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    })

    .post('/register', async (req, res) => {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({email, password: hashedPassword});
        res.sendStatus(201);
    })

    .post('/login', async (req, res) => {
        const {username, password} = req.body;
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.sendStatus(401);
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET!);
        res.json({token});
    })





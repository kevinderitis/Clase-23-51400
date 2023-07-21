import CustomRouter from './router.js';
import jwt from 'jsonwebtoken';

let users = [];
const secret = 'clavesecreta';

export default class SessionRouter extends CustomRouter {
    init(){
        this.get('/', (req, res) => {
            res.sendSuccess('session router')
        });
        this.post('/register', ["PUBLIC"],(req, res) => {
            let user = req.body;
            user.role = 'USER';
            users.push(user)
            res.sendSuccess(user)
        })
        this.post('/login', ["PUBLIC"],(req, res) => {
            let user = req.body;
            user.role = 'USER';
            let token = jwt.sign(user, secret)
            res.sendSuccess({ token })
        })
        this.put('/', (req, res) => {
            res.send('put session ok')
        })
        this.delete('/', (req, res) => {
            res.send('delete session ok')
        })
    }
}
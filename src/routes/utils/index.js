import jwt from 'jsonwebtoken';

const secret = 'clavesecreta';

export const generateCustomResponses = (req, res, next) => {
    res.sendSuccess = payload => res.send({ status: "success", payload})
    res.sendServerError = error => res.status(500).send({status: 'error', error})
    res.sendUserError = error => res.status(400).send({status: 'error', error})
    next()
}

export const handlePolicies = policies => (req, res, next) => {
    if(policies[0] === 'PUBLIC') return next();
    const authHeaders = req.headers.authorization;
    if(!authHeaders) return res.status(401).send({ status: 'error', error: 'Unauthorized'});
    const token = authHeaders.split(" ")[1];
    let user = jwt.verify(token, secret);
    if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({ status: 'error', error: 'No tiene permisos'});
    req.user = user;
    next()
}
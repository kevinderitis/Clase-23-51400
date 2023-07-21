import { Router } from 'express';
const petRouter = Router();

let pets = [];

petRouter.param('name', async (req, res, next, name) => {
    if(!/^[a-zA-Z ]+$/.test(name)){
       return res.status(400).json({ msg: "El nombre de la mascota no corresponde con la estrucuta espereada (Solo string)"})
    }
    req.pet = pets.find(p => p.name == name);
    if(!req.pet){
        return res.status(401).json({msg: "La mascota no existe"})
    }
    next()
})

petRouter.get('/:name', (req, res) => {
    let pet = req.pet;
    res.send(pet)
})

petRouter.post('/', (req, res) => {
    let pet = req.body;
    if(!/^[a-zA-Z ]+$/.test(pet.name)){
        return res.status(400).json({msg: "El nombre de la mascota no cumple con el formato requerido"})
    }
    pets.push(pet);
    res.send(pet)
})

petRouter.put('/:name', (req, res) => {
    let { name } = req.params;
    let petIndex = pets.findIndex(p => p.name == name);
    pets[petIndex].adopted = true;
    res.send(pets[petIndex])
})

petRouter.get('/:name/:otro', (req, res) => {
    res.send(pets)
})


export default petRouter;

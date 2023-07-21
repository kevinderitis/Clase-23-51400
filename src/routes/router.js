import { Router } from 'express';
import { generateCustomResponses, handlePolicies } from './utils/index.js'

export default class CustomRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params) => {
            try {
                await callback.apply(this,params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    getRouter(){
        return this.router;
    }
    init(){}

    get(path,...callbacks){
        this.router.get(path,handlePolicies, generateCustomResponses, this.applyCallbacks(callbacks))
    }
    post(path,...callbacks){
        this.router.post(path,handlePolicies, generateCustomResponses, this.applyCallbacks(callbacks))
    }
    put(path,...callbacks){
        this.router.put(path,handlePolicies, generateCustomResponses, this.applyCallbacks(callbacks))
    }
    delete(path,...callbacks){
        this.router.delete(path,handlePolicies, generateCustomResponses,this.applyCallbacks(callbacks))
    }
}
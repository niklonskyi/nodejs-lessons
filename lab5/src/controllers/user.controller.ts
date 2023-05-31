import { RequestHandler } from "express";
import { usersDB } from "../../db/user.db";
import User from "../models/user.entity";

const createUser:RequestHandler = (req, res, next) => {
    if (!req.body.name || req.body.name === "") {
        throw new Error('No name defined');
    }

    const user: User = {
        id: usersDB.length,
        username: req.body['username'],
        name: req.body['name'],
    };

    usersDB.push(user);
    console.log(usersDB);
    res.send('Data Received: ' + JSON.stringify(req.body));
}

const getUserById:RequestHandler = (req, res, next) => {
    const id = Number(req.params.id);
    
    if (id > usersDB.length - 1 || id < 0) {
        throw new Error('No such id');
    }

    res.send(JSON.stringify(usersDB[id]));
}

const getUsers: RequestHandler = (req, res, next) => {
    res.send(JSON.stringify(usersDB));
}

const deleteUserById: RequestHandler = (req, res, next) => {
    const id = Number(req.params.id);

    if (id > usersDB.length - 1 || id < 0) {
        throw new Error('No such id');
    }

    usersDB.splice(id, 1);

    res.send(`Succesfully deleted user with id: ${id}`);
}

const updateUserById: RequestHandler = (req, res, next) => {
    const id = Number(req.params.id);

    if (id > usersDB.length - 1 || id < 0) {
        throw new Error('No such id');
    }

    const user = usersDB[id];

    if (req.body.name) {
        usersDB[id].name = req.body.name; 
    }

    if (req.body.username) {
        usersDB[id].username = req.body.username;
    }

    res.send(`Succesfully updated user with id: ${id}`);
}

export {createUser, getUserById, getUsers, deleteUserById, updateUserById}
import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('helo form create');
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'seccuess',
            data: { ...user },
            Message: 'User created seccuessfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getMany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userModel.getMany();
        res.json({
            status: 'seccuess',
            data: users,
            Message: 'Users retrived seccuessfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('helo form get one');

    try {
        const user = await userModel.getOne(req.params.id as unknown as number);
        res.json({
            status: 'seccuess',
            data: user,
            Message: 'User retrived seccuessfully',
        });
    } catch (error) {
        next(error);
    }
};

export const updateOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('helo form update one ');

    try {
        const user = await userModel.updateOne(req.body);
        res.json({
            status: 'seccuess',
            data: user,
            Message: 'User updated seccuessfully',
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.deleteOne(
            req.params.id as unknown as number
        );
        res.json({
            status: 'seccuess',
            data: user,
            Message: 'User Deleted seccuessfully',
        });
    } catch (error) {
        next(error);
    }
};

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        const token = jwt.sign(
            { user },
            config.tokenSecret as unknown as string
        );
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the username and password do not match try again',
            });
        }
        return res.json({
            status: 'seccess',
            data: { ...user, token },
            message: 'user authenticated seccessfully',
        });
    } catch (error) {
        return next(error);
    }
};

import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

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
    console.log('helo form get all');

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
        const user = await userModel.getOne(req.params.id as unknown as string);
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
            req.params.id as unknown as string
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




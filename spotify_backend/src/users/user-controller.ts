import { Request, Response } from 'express';
import UserService from './user-service';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }

    getUserByIdFull = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const user = await this.userService.getUserByIdFull(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }

    getArtists = async (req: Request, res: Response): Promise<void> => {
        try {
            const artists = await this.userService.getArtists();
            res.status(200).json(artists);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const user = req.body;
            const updatedUser = await this.userService.updateUser(id, user);
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const deletedUser = await this.userService.deleteUser(id);
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(500).json({ message: (err as any).message });
        }
    }
}

export default UserController;

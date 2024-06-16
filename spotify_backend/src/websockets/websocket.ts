import {Server, Socket} from "socket.io";
import UserSchema from "../auth/models/User";

export class Chat {
    io: Server;

    constructor(io: Server) {
        io.use(async (socket, next) => {
            (socket as any).email = socket.handshake.auth.email;
            next();
        });

        io.on("connect", this.addConnection.bind(this));
        io.on("disconnect", this.destroyConnection.bind(this));

        this.io = io;
    }

    async onListen(socket: Socket, songId: string) {
        await UserSchema.findOneAndUpdate({ email: (socket as any).email }, { lastSongId: songId, lastActivity: new Date() });
        const users = (await UserSchema.find().exec());
        this.io.emit("users", users);
    }

    async destroyConnection(socket: Socket) {
        await UserSchema.findOneAndUpdate({ email: (socket as any).email }, { isOnline: false })
        const users = (await UserSchema.find().exec())
        this.io.emit("users", users);
    }

    async addConnection(socket: Socket) {
        socket.on("disconnect", () => this.destroyConnection.bind(this)(socket));
        socket.on("listen", (songId) => this.onListen.bind(this)(socket, songId));

        console.log("Connected: ", (socket as any).email)
        const user = (await UserSchema.findOne({ email: (socket as any).email }).exec())

        if (user === null) {
            socket.disconnect();
            return;
        }

        await UserSchema.findOneAndUpdate({ email: (socket as any).email }, { isOnline: true });

        const users = (await UserSchema.find().exec())

        this.io.emit("users", users);
    }
}
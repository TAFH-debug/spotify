import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUser } from './models/User';
import UserModel from './models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RefreshTokenModel from './models/RefreshToken';

dotenv.config();

class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET!;
  private readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!;

  async meFull(email: string) {
    return await UserModel.findOne({ email }).populate("playlists").populate("songs").populate("favoriteSongs").populate("favoritePlaylists").exec();
  }

  async me(email: string) {
    return await UserModel.findOne({ email }).exec();
  }

  async registerUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    return user;
  }

  async loginUser(email: string, password: string): Promise<{ user: IUser, accessToken: string, refreshToken: string } | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const accessToken = this.generateJwt(user);
    const refreshToken = this.generateRefreshToken(user);

    const refreshTokenDoc = new RefreshTokenModel({ token: refreshToken, user: user._id });
    await refreshTokenDoc.save();

    return { user, accessToken, refreshToken };
  }

  private generateJwt(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, this.jwtSecret, { expiresIn: '10h' });
  }

  private generateRefreshToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, this.jwtRefreshSecret, { expiresIn: '7d' });
  }

  verifyJwt(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      return null;
    }
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtRefreshSecret);
    } catch (err) {
      return null;
    }
  }

  async refreshToken(oldToken: string): Promise<{ accessToken: string, refreshToken: string } | null> {
    const payload = this.verifyRefreshToken(oldToken);
    if (!payload) return null;

    const user = await UserModel.findById(payload.id);
    if (!user) return null;

    const newAccessToken = this.generateJwt(user);
    const newRefreshToken = this.generateRefreshToken(user);

    const refreshTokenDoc = new RefreshTokenModel({ token: newRefreshToken, user: user._id });
    await refreshTokenDoc.save();

    await RefreshTokenModel.deleteOne({ token: oldToken });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export default AuthService;

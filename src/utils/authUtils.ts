import jwt from "jsonwebtoken";

const authUtils = {
    async generateToken (id: any){
        const payload: any = { id: id };
        const jwtKey: any = process.env.JWT_SECRET;
        const expiresIn: any = process.env.TOKEN_EXPIRES_IN || "1h";
        const token = jwt.sign(payload, jwtKey, {expiresIn: expiresIn});
        return token;
    }
}

export default authUtils;
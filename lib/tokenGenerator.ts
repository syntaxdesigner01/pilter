import jwt, { JwtPayload } from 'jsonwebtoken';
// import { generateSigningKey } from './generateId';

// Load the JWT_SECRET from environment variables
// const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';


// Define the User interface
interface User {
    id: string;
    email: string;
    name: string;
    verifyKey: string
}

// Function to sign a JWT token
export const sign_Jwt_Token = (user: User,): string => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email, verifyKey:user.verifyKey },
        user.verifyKey,
        { expiresIn: '30d', algorithm: 'HS256' }
    );
};


export const verify_Jwt_Token = (token: string) => {
    try {
        const decode = jwt.decode(token);
        if (!decode) {
            throw new Error("Failed to decode token");
        }
        const currentTime = Math.floor(Date.now() / 1000);
        const expTime = (decode as JwtPayload).exp;

        if (expTime && expTime < currentTime) {
                return decode as JwtPayload
        }else{
            return "Token expired"
        }
    //    const key = generateSigningKey()
    //    return key

    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token");
    }
};



// export const verify_Jwt_Token = (token: string): JwtPayload | null => {
//     if (!token) {
//         console.error("No token provided");
//         return null; // or throw an error based on your preference
//     }

//     try {
//         const decoded = jwt.decode(token);
//         console.log("Decoded token:", decoded); // Log the decoded token for debugging

//         return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
//         // return decoded as JwtPayload
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error("Token verification failed:", error.message);
//         } else {
//             console.error("Token verification failed:", error);
//         }
//         return null; // Return null instead of throwing an error
//     }
// };
"use server";

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { routeLinks } from '../routerLinks';

const users = [
    {
        id: 1,
        name: 'Joseph Akpan',
        email: 'akpanjoseph2021@gmail.com',
        password: '1111'
    }
];

export async function signInWithGoogle() {
    try{ 
        await signIn("google")
        console.log('sign in successfully')
    }
    catch(err){
        console.log(err);
        redirect(routeLinks.error)
    }
}

export async function signOutWithGoogle() {
    await signOut();
    console.log("Signed out");
}

export async function signUpWithCredential({email, password}:{email: string, password: string}) {
    const existingUser = users.find(user => user.email === email);

    if (existingUser){
        console.log({ body: existingUser, message: 'User already exists' })
        return {body:existingUser, message: 'User already exists!.Try Signing-In with your email address',status:401}; 
    }else{
        const newUser = {
            id: users.length + 1,
            name: email.split('@')[0],
            email,
            password
        }
        users.push(newUser);
        console.log('New user created');
        console.log(newUser)
        return {body: newUser,message:'Account created successfully',status:200};
    }
}


export async function signInWithCredential({ email, password }: { email: string, password: string }) {
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser && existingUser.password === password) {

        console.log({ body: existingUser, message: 'Welcome Back!' })
        return { body: existingUser, message: 'Welcome Back!',status:200 };
    } else {
       return {message:'Invalid username or password',status:404}
    }
}

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import prisma from "../../../prisma/prismaClient.js"


const signinUserSchema = z.object({
    username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'username is not valid'),
    password: z.string().min(5, 'password is too short'),
})

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            async authorize(credentials, req, res) {
               const {username, password} = signinUserSchema.parse(credentials)
               const user = await prisma.user.findUnique({
                     where: {username},
                })

                if(!user) return null

                const isPasswordValid = await bcrypt.compare(password, user.password)
                if(!isPasswordValid) return null

                if (user) {
                    return user
                }
                return null
            }
        })
    ],
    callbacks:{
        session({session, token}){
            session.user.id = token.id
            session.user.username = token.username
            session.user.role = token.role
            return session
        },
        jwt({token, account, user}){
            if(account){
                token.accessToken = account.accessToken
                token.id = account.id
                token.username = user.username
                token.role = user.role
            }
            return token
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
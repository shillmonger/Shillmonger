import NextAuth, { NextAuthOptions, User } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import { Adapter } from "next-auth/adapters"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password')
        }

        try {
          const client = await clientPromise
          const db = client.db()
          const user = await db.collection('users').findOne({ email: credentials.email })

          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid credentials')
          }

          const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials')
          }

          // Return the user object without the password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image
          } as User
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth-page/login',
    error: '/auth-page/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

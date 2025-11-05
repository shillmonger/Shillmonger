import NextAuth, { NextAuthOptions, User, Session } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"

// Debug function to log detailed information
export function debugLog(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Auth Debug] ${message}`, data || '');
  }
}

export const authOptions: NextAuthOptions = {
  // Use MongoDB adapter with explicit database name
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
          debugLog('Missing credentials', { email: !!credentials?.email, password: '•••••' });
          throw new Error('Please enter both email and password');
        }

        try {
          debugLog('Authentication attempt', { email: credentials.email });
          
          const client = await clientPromise;
          const db = client.db('shillmonger');
          
          // Case-insensitive email search
          const user = await db.collection('users').findOne({ 
            email: { $regex: new RegExp(`^${credentials.email}$`, 'i') } 
          });

          if (!user) {
            debugLog('User not found', { email: credentials.email });
            throw new Error('Invalid email or password');
          }

          if (!user.hashedPassword) {
            debugLog('User has no password set', { email: credentials.email });
            throw new Error('Account not properly set up');
          }

          debugLog('User found, verifying password...');
          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.hashedPassword
          );

          if (!isPasswordValid) {
            debugLog('Invalid password', { email: credentials.email });
            throw new Error('Invalid email or password');
          }

          // Log successful login
          debugLog('Authentication successful', { 
            userId: user._id.toString(),
            email: user.email 
          });
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image || null,
            phone: user.phone || null
          } as User;
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Authentication failed. Please try again.');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        if ('phone' in user) token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.phone) {
          (session.user as any).phone = token.phone;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth-page/login",
    error: "/auth-page/login",
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error('Auth error:', { code, metadata });
    },
    warn(code) {
      console.warn('Auth warning:', code);
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Auth debug:', { code, metadata });
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

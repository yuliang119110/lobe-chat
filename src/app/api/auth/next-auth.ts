import { createClient } from '@supabase/supabase-js';
import NextAuth from 'next-auth';

import { getServerConfig } from '@/config/server';

const { NEXTAUTH_SECRET } = getServerConfig();

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

declare module '@auth/core/jwt' {
  interface JWT {
    userId?: string;
  }
}

// 在文件顶部添加这个函数
async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('User data:', data); // 打印用户数据
    return data;
  } catch (error) {
    console.error('注册用户时出错:', (error as Error).message);
    return null;
  }
}

const nextAuth = NextAuth({
  callbacks: {
    async jwt({ token, account }) {
      console.log('account:', account); // 添加这行日志
      if (account) {
        token.userId = account.providerAccountId;
      }
      console.log('Token:', token); // 打印 token
      return token;
    },
    async session({ session, token }) {
      console.log('Session:', session); // 打印 session
      if (session.user) {
        session.user.id = token.userId ?? session.user.id;
      }
      return session;
    },
  },
  providers: [
    {
      id: 'signIn',
      name: 'SignIn',
      credentials: {
        email: { label: 'Email', type: 'text' }, // 使用 email 而不是 username
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      authorize: async function (credentials) {
        console.log('Email:', credentials.email); // 打印 email
        console.log('Password:', credentials.password); // 打印 password
        try {
          const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (error) {
            throw new Error(error.message);
          }
          const { user } = data;
          // const account= {
          //   provider: 'signIn',
          //   type: 'credentials',
          //   access_token: session.access_token,
          //   token_type: session.token_type,
          //   expires_at: session.expires_in,
          //   refresh_token: session.refresh_token,
          //   }

          const userObj = {
            ...user,
            // ...account,
          };
          console.log('User data:', userObj); // 打印用户数据

          return userObj;
        } catch (error) {
          console.error('认证用户时出错:', (error as Error).message);
          return null;
        }
      },
    },
    // 添加新的注册 provider
    {
      id: 'register',
      name: 'Register',
      credentials: {
        email: { label: 'Email', type: 'text' }, // 使用 email 而不是 username
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      authorize: async function (credentials) {
        console.log('Email:', credentials.email); // 打印 email
        console.log('Password:', credentials.password); // 打印 password
        try {
          const data = await signUp(credentials.email as string, credentials.password as string);
          if (data) {
            console.log('Data:', data); // 打印用户数据
            if (data.user && !data.user.user_metadata.email_verified) {
              throw new Error('邮件还未验证');
            }
            const user = { ...data.user };
            console.log('User data:', user); // 打印用户数据
            return user;
          } else {
            throw new Error('注册失败');
          }
        } catch (error) {
          console.error('注册用户时出错:', (error as Error).message);
          return null;
        }
      },
    },
  ],
  secret: NEXTAUTH_SECRET,
  trustHost: true,
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = nextAuth;

export { nextAuth };

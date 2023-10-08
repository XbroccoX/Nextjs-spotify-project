import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log("TOKEN ENTRO A LA FUNCION Y FUE REFRESCADO", refreshToken);

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: refreshToken.expires_in * 1000 + Date.now(), // = 1 hora como 3600 retornos por spotify API
      refreshToken: refreshToken.refresh_token ?? token.refreshToken, // reemplazar si vuelve el nuevo, si no, volver al antiguo token de actualización
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // primera vez que iniciamos sesion
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expire_at * 1000,
        };
      }

      //retornamos previo token si el accessToken no ha expirado aun
      if (Date.now() < token.accessTokenExpires) {
        console.log("EL EXISTENTE TOKEN HA EXPIRADO, REFRESCANDO ...");
        return token;
      }

      // el token ha expirado, hacemos un refresh
      console.log("TOKEN EXPIRADO, REFRESCANDO ...");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};

export default NextAuth(authOptions);

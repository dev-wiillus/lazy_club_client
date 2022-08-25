import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
});

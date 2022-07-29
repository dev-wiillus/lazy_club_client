import type { NextPage } from "next";
import Seo from "../../components/Seo";

const SignIn: NextPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col my-auto">
        <div className="">
          <h3>성공하는 사람들의 성장 습관</h3>
          <h1>LAZY CLUB</h1>
          <h2>회원가입</h2>
        </div>
        <div>
          <h4>카카오 계정으로 로그인</h4>
          <h4>네이버 계정으로 로그인</h4>
          <h4>Google 계정으로 로그인</h4>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

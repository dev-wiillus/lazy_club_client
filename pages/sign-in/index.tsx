import type { NextPage } from "next";
import Logo from "../../components/NavBar/Logo";

// TODO: access token으로 로그인 여부 판

const SignIn: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h2>성공하는 사람들의 성장 습관</h2>
          <Logo fontSize="text-5xl" />
          <h3 className="text-2xl font-bold">로그인</h3>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h4>카카오 계정으로 로그인</h4>
            <a id="custom-login-btn" href="javascript:loginWithKakao()">
              <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
              />
            </a>
            <h4>네이버 계정으로 로그인</h4>
            <h4>Google 계정으로 로그인</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

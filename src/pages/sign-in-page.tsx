import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";

import gitHubLogo from "@/assets/github-mark-white.svg";
import googleLogo from "@/assets/google-mark.svg";
import kakaoLogo from "@/assets/kakao-mark.svg";

import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message);
        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message);
      },
    });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  const handleSignInWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  const handleSignInWithKakaoClick = () => {
    signInWithOAuth("kakao");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          DayFeed
        </div>
        <p className="text-sm text-slate-500">계정에 로그인하세요</p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          disabled={isPending}
          className="h-12 px-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="이메일"
        />
        <Input
          disabled={isPending}
          className="h-12 px-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="패스워드"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mt-1 h-12 w-full text-sm font-semibold"
        >
          로그인
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">또는</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          disabled={isPending}
          className="h-11 w-full"
          variant={"outline"}
          onClick={handleSignInWithGoogleClick}
        >
          <img src={googleLogo} alt="Google 로고" className="h-4 w-4" />
          구글 계정으로 로그인
        </Button>
        <Button
          disabled={isPending}
          className="h-11 w-full bg-black text-white hover:bg-gray-900 hover:text-white"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
        >
          <img src={gitHubLogo} alt="Github 로고" className="h-4 w-4" />
          Github 계정으로 로그인
        </Button>
        <Button
          disabled={isPending}
          className="h-11 w-full bg-[#fee500] text-slate-900 hover:bg-[#f5dd00]"
          variant={"outline"}
          onClick={handleSignInWithKakaoClick}
        >
          <img src={kakaoLogo} alt="Kakao 로고" className="h-4 w-4" />
          카카오 계정으로 로그인
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-2 text-center">
        <Link
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
          to={"/sign-up"}
        >
          계정이 없으시다면? <span className="font-medium">회원가입</span>
        </Link>
        <Link
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </>
  );
}

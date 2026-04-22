import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { useState } from "react";
import { Link } from "react-router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending } = useSignUp();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({ email, password });
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Dayfeed
        </div>
        <p className="text-sm text-slate-500">새 계정을 만드세요</p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          className="h-12 px-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="이메일"
        />
        <Input
          className="h-12 px-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="패스워드"
        />
        <Button
          type="submit"
          className="mt-1 h-12 w-full text-sm font-semibold"
          disabled={isPending}
        >
          회원가입
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
          to={"/sign-in"}
        >
          이미 계정이 있다면? <span className="font-medium">로그인</span>
        </Link>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { useState } from "react";
import { Link } from "react-router";
import { signUp } from "@/api/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp } = useSignUp();

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="이메일"
        />
        <Input
          className="py-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="패스워드"
        />
      </div>
      <div>
        <Button className="w-full" onClick={handleSignUpClick}>
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/use-request-password-reset-email";
import { generateErrorMessage } from "@/lib/error";
import { usePasswordResetActions } from "@/store/password-reset";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setEmail: setPasswordResetEmail } = usePasswordResetActions();

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess() {
      setPasswordResetEmail(email);
      navigate("/verify-otp");
    },
    onError(error) {
      const message = generateErrorMessage(error);
      toast.error(message);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;

    requestPasswordResetEmail(email);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          DayFeed
        </div>
        <p className="text-sm text-slate-500">
          이메일로 비밀번호 재설정 인증 코드를 보내드립니다.
        </p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          disabled={isRequestPasswordResetEmailPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4"
          placeholder="이메일"
          type="email"
        />
        <Button
          type="submit"
          disabled={isRequestPasswordResetEmailPending}
          className="mt-1 h-12 w-full text-sm font-semibold"
        >
          인증 메일 요청하기
        </Button>
      </form>
    </>
  );
}

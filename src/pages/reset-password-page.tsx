import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 변경되었습니다.");
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message);
        setPassword("");
        setConfirmPassword("");
      },
    });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (password.trim() === "") return;
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      setConfirmPassword("");
      return;
    }

    updatePassword(password);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          DayFeed
        </div>
        <p className="text-sm text-slate-500">새로운 비밀번호를 입력하세요</p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          disabled={isUpdatePasswordPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="h-12 px-4"
          placeholder="새 비밀번호"
        />
        <Input
          disabled={isUpdatePasswordPending}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className="h-12 px-4"
          placeholder="새 비밀번호 확인"
        />
        <Button
          type="submit"
          disabled={isUpdatePasswordPending}
          className="mt-1 h-12 w-full text-sm font-semibold"
        >
          비밀번호 변경하기
        </Button>
      </form>
    </>
  );
}

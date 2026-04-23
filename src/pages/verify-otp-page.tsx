import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyPasswordResetOtp } from "@/hooks/mutations/use-verify-password-reset-otp";
import { generateErrorMessage } from "@/lib/error";
import {
  usePasswordResetActions,
  usePasswordResetEmail,
} from "@/store/password-reset";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const email = usePasswordResetEmail();
  const { clear } = usePasswordResetActions();
  const navigate = useNavigate();

  const { mutate: verifyOtp, isPending } = useVerifyPasswordResetOtp({
    onSuccess() {
      clear();
      navigate("/reset-password");
    },
    onError(error) {
      const message = generateErrorMessage(error);
      toast.error(message);
    },
  });

  const handleChange = (token: string) => {
    if (token.length === 6) {
      verifyOtp({ email, token });
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          DayFeed
        </div>
        <p className="text-sm text-slate-500">
          이메일로 발송된 6자리 인증 코드를 입력하세요.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <InputOTP maxLength={6} disabled={isPending} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="size-12 text-lg" />
            <InputOTPSlot index={1} className="size-12 text-lg" />
            <InputOTPSlot index={2} className="size-12 text-lg" />
            <InputOTPSlot index={3} className="size-12 text-lg" />
            <InputOTPSlot index={4} className="size-12 text-lg" />
            <InputOTPSlot index={5} className="size-12 text-lg" />
          </InputOTPGroup>
        </InputOTP>

        <p className="flex gap-1 text-xs text-slate-400">
          코드를 받지 못하셨나요?
          <span
            className="cursor-pointer text-slate-600 underline"
            onClick={() => navigate("/forget-password")}
          >
            다시 요청하기
          </span>
        </p>
      </div>
    </>
  );
}

import { verifyPasswordResetOtp } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useVerifyPasswordResetOtp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: verifyPasswordResetOtp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

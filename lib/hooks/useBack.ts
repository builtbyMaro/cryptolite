"use client";

import { useRouter } from "next/navigation";

export const useBack = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return handleBack;
};

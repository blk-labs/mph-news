import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useRouting(
    callback: (status: "start" | "error" | "complete") => void
  ) {
    const router = useRouter();
  
    const handleStart = (url: string) => url !== router.asPath && callback("start");
    const handleError = (url: string) => callback("error");
    const handleComplete = (url: string) => callback("complete");
  
    useEffect(() => {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleError);
  
      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleError);
      };
    });
  }
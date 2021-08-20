import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollTop() {
  const { router } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);

  return null;
}
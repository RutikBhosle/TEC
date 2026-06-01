import { useEffect } from "react";
import { useRouter } from "next/router";

const MediaKitPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/advertise-with-us");
  }, [router]);

  return null;
};

export default MediaKitPage;

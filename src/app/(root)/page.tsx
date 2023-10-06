import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";

import { GoogleLogin } from "../../components/GoogleLogin";

export default async function Home() {
  // console.log("cookies", cookies());
  const session = await getServerSession();
  console.log("session", !!session);
  return (
    <main>
      <GoogleLogin />
      <div>server: {session ? "ログイン済み" : "未ログイン"}</div>
    </main>
  );
}

"use client";

import { SessionProvider as _SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  return <_SessionProvider>{children}</_SessionProvider>;
};

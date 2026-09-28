"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

type AuthPage = "/sign-in" | "/sign-up";

async function signUpWithProvider(
  provider: OAuthProvider,
  failurePage: AuthPage
): Promise<never> {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  if (!origin) {
    throw new Error("Unable to determine the request origin for OAuth.");
  }

  const redirectUrl = await account.createOAuth2Token(
    provider,
    `${origin}/oauth`,
    `${origin}${failurePage}`
  );

  return redirect(redirectUrl);
}

export async function signUpWithGithub(): Promise<never> {
  return signUpWithProvider(OAuthProvider.Github, "/sign-up");
}

export async function signUpWithGoogle() {
  return signUpWithProvider(OAuthProvider.Google, "/sign-up");
}

export async function signInWithGoogle(): Promise<never> {
  return signUpWithProvider(OAuthProvider.Google, "/sign-in");
}

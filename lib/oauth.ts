"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

type AuthPage = "/sign-in" | "/sign-up";
type OAuthFailure = {
  success: false;
  message: string;
};

const DEFAULT_APP_URL = "https://track-jeel.vercel.app";

function getRequiredAppwriteConfig() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const key = process.env.NEXT_APPWRITE_KEY;

  if (!endpoint || !project || !key) {
    throw new Error("Appwrite OAuth configuration is incomplete.");
  }

  return { endpoint, project, key };
}

async function signUpWithProvider(
  provider: OAuthProvider,
  failurePage: AuthPage
): Promise<OAuthFailure | never> {
  let redirectUrl: string;

  try {
    getRequiredAppwriteConfig();

    const origin =
      headers().get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      DEFAULT_APP_URL;
    const baseUrl = new URL(origin).origin;
    const { account } = await createAdminClient();

    redirectUrl = await account.createOAuth2Token(
      provider,
      `${baseUrl}/oauth`,
      `${baseUrl}${failurePage}`
    );
  } catch (error) {
    console.error("OAuth initiation failed:", error);

    return {
      success: false,
      message: "Unable to start sign-in. Please try again.",
    };
  }

  return redirect(redirectUrl);
}

export async function signUpWithGithub(): Promise<OAuthFailure | never> {
  return signUpWithProvider(OAuthProvider.Github, "/sign-up");
}

export async function signUpWithGoogle(): Promise<OAuthFailure | never> {
  return signUpWithProvider(OAuthProvider.Google, "/sign-up");
}

export async function signInWithGoogle(): Promise<OAuthFailure | never> {
  return signUpWithProvider(OAuthProvider.Google, "/sign-in");
}

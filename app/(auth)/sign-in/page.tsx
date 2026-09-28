import SignInCard from "@/components/SignInCard";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const user = await getCurrent();
  if (user) redirect("/");
  return <SignInCard />;
};

export default SignIn;

import LoginForm from "@/components/auth/login/LoginForm";
import OAuthLogins from "@/components/auth/OAuthLogins";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="h-full gap-2 flex items-center justify-center flex-col">
      <Card className="min-w-96 flex flex-col gap-4">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to contiune</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <LoginForm />
        </CardContent>
        <Separator />
        <CardFooter>
          <OAuthLogins />
        </CardFooter>
      </Card>
      <p>
        Do not have account ?&nbsp;
        <Link
          href={"/auth/register"}
          className="underline-offset-4 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

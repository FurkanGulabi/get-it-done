import OAuthLogins from "@/components/auth/OAuthLogins";
import RegisterForm from "@/components/auth/register/RegisterForm";
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

const RegisterPage = () => {
  return (
    <div className="h-full gap-2 flex items-center justify-center flex-col">
      <Card className="min-w-96 flex flex-col gap-4">
        <CardHeader className="text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Register to contiune</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <RegisterForm />
        </CardContent>
        <Separator />
        <CardFooter>
          <OAuthLogins />
        </CardFooter>
      </Card>
      <p>
        Already have account ?&nbsp;
        <Link
          href={"/auth/login"}
          className="underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

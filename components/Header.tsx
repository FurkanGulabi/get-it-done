import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { UserButton } from "./auth/UserButton";
import { auth } from "@/auth";

export async function Header() {
  const session = await auth();

  return (
    <header
      className={
        "p-3 w-full  sticky top-0 z-50 bg-background/60 backdrop-blur-md"
      }
    >
      <div className="container mx-auto flex flex-row justify-between items-center ">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">GetItDone</h1>
        </Link>
        {!session ? (
          <>
            <div className="hidden xl:flex items-center gap-2">
              <DesktopNav />
            </div>
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </>
        ) : (
          <UserButton session={session} />
        )}
      </div>
    </header>
  );
}

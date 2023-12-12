import { SIDE_MENU_LINKS } from "@/constants";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart, User } from "lucide-react";
import PostButton from "./post-button";
import ThemeButtons from "./theme-buttons";

export default function SideMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="w-1/5 md:w-1/4 py-4 pr-4 h-[88vh] border-r border-gray-200 flex flex-col gap-8">
      {SIDE_MENU_LINKS.map((link) => (
        <Link href={link.href} key={link.id}>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2 w-full justify-center md:justify-start",
              pathname === link.href
                ? "bg-[#f1f5f9] dark:bg-[#1e293b]"
                : "bg-transparent"
            )}
          >
            <link.icon />
            <span className="hidden md:inline">{link.title}</span>
          </Button>
        </Link>
      ))}
      {!session && <ThemeButtons />}
      {session && (
        <>
          <Link href="/profile">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 w-full justify-center md:justify-start",
                pathname === "/profile"
                  ? "bg-[#f1f5f9] dark:bg-[#1e293b]"
                  : "bg-transparent"
              )}
            >
              <User />
              <span className="hidden md:inline">Profile</span>
            </Button>
          </Link>
          <Link href="/likes">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 w-full justify-center md:justify-start",
                pathname === "/likes"
                  ? "bg-[#f1f5f9] dark:bg-[#1e293b]"
                  : "bg-transparent"
              )}
            >
              <Heart />
              <span className="hidden md:inline">Likes</span>
            </Button>
          </Link>
          <ThemeButtons />
          <PostButton />
        </>
      )}
    </div>
  );
}

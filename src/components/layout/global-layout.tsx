import { Link, Outlet } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import logo from "@/assets/logo.png";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-5xl justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={logo} className="h-5" />
            <div className="font-bold">DayFeed</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img src={defaultAvatar} className="h-6 cursor-pointer" />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-5xl flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-8 text-sm">
        <div className="m-auto flex w-full max-w-5xl items-end justify-between px-4">
          <div className="flex flex-col gap-1">
            <span className="text-foreground font-semibold">DayFeed</span>
            <span>일상의 기록을 피드로 남기는 공간</span>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs">
            <span>© 2026 KimSuro</span>
            <span>Frontend Developer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

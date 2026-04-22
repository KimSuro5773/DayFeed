import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b bg-white">
        <div className="m-auto flex h-full w-full max-w-5xl items-center px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={logo} className="h-5" />
            <div className="font-bold">DayFeed</div>
          </Link>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

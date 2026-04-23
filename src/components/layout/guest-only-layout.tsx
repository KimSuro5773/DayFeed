import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const sesstion = useSession();

  if (sesstion) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}

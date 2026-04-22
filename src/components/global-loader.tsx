import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img src={logo} alt="DayFeed 썸네일" className="w-10" />
        <div className="text-2xl font-bold">DayFeed</div>
      </div>
    </div>
  );
}

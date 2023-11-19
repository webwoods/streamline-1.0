export default function Footer() {
  return (
    <div className="bg-zinc-50 w-full h-full flex flex-col min-h-[10rem] gap-5 items-center text-slate-700 p-20">
      <div className="flex flex-col gap-1 text-sm items-center">
        <span>Privacy Policy</span>
        <span>Sitemap</span>
        <span>Terms of User</span>
      </div>
      <h1 className="text-slate-600 text-xs">Powered by StreamLine</h1>
    </div>
  );
}
export default function YarnsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      {/* Topbar */}
      <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">İplik Deposu</h1>
          <p className="text-xs text-[#9C8B81] mt-0.5">48 renk · 3 marka</p>
        </div>
        <button className="bg-[#8FAF8A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6B9A67] transition-colors">
          + Yeni İplik
        </button>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col items-center justify-center mt-32 gap-3">
        <div className="w-16 h-16 rounded-full bg-[#EDE7DF] flex items-center justify-center text-3xl">
          🧵
        </div>
        <p className="font-serif text-lg text-[#3a2e26]">İplik deposu yakında</p>
        <p className="text-sm text-[#9C8B81]">Supabase bağlantısı kurulduktan sonra burayı dolduracağız.</p>
      </div>
    </div>
  );
}
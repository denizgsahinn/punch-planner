export default function CostPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">Maliyet Hesabı</h1>
          <p className="text-xs text-[#9C8B81] mt-0.5">Proje bazlı maliyet ve satış fiyatı</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-32 gap-3">
        <div className="w-16 h-16 rounded-full bg-[#EDE7DF] flex items-center justify-center text-3xl">
          🧮
        </div>
        <p className="font-serif text-lg text-[#3a2e26]">Maliyet modülü yakında</p>
        <p className="text-sm text-[#9C8B81]">Projeler eklendikten sonra burası aktif olacak.</p>
      </div>
    </div>
  );
}
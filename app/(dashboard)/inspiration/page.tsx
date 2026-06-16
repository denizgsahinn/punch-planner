export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">İlham Panosu</h1>
          <p className="text-xs text-[#9C8B81] mt-0.5">Şablonlar ve favori desenler</p>
        </div>
        <button className="bg-[#C4BEDE] text-[#4a3d7a] text-sm px-4 py-2 rounded-full hover:bg-[#B0A8D4] transition-colors">
          + İlham Ekle
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-32 gap-3">
        <div className="w-16 h-16 rounded-full bg-[#EDE7DF] flex items-center justify-center text-3xl">
          ❤️
        </div>
        <p className="font-serif text-lg text-[#3a2e26]">İlham panosu yakında</p>
        <p className="text-sm text-[#9C8B81]">Favori desen ve şablonlarını buraya kaydedeceksin.</p>
      </div>
    </div>
  );
}
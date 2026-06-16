export default function GalleryPage() {
  const projects = [
    { id: 1, name: "Gül Çelengi",       size: "20×20 cm", hours: 8,  colors: 14, status: "done",    bg: "from-[#F2E2D4] to-[#E8C4B8]" },
    { id: 2, name: "Kaktüs Serisi",     size: "15×25 cm", hours: 5,  colors: 8,  status: "wip",     bg: "from-[#DCE8D8] to-[#B8D4B4]" },
    { id: 3, name: "Geometrik Çerçeve", size: "30×30 cm", hours: 0,  colors: 6,  status: "idea",    bg: "from-[#E0DCF0] to-[#C4BEDE]" },
    { id: 4, name: "Ayçiçeği",         size: "25×25 cm", hours: 10, colors: 9,  status: "done",    bg: "from-[#F7EDD5] to-[#F0D89A]" },
    { id: 5, name: "Kalp Buketi",       size: "18×18 cm", hours: 3,  colors: 6,  status: "wip",     bg: "from-[#F5E2E2] to-[#EAB8B8]" },
  ];

  const statusMap: Record<string, { label: string; cls: string }> = {
    done: { label: "✓ Bitti",   cls: "bg-[#D6EAD4] text-[#3a6636]" },
    wip:  { label: "⟳ Devam",  cls: "bg-[#FDE8D0] text-[#8C4A1A]" },
    idea: { label: "✦ Fikir",   cls: "bg-[#E4DCF0] text-[#5a3d8a]" },
  };

  const stats = [
    { label: "toplam proje", value: "12" },
    { label: "devam ediyor", value: "5"  },
    { label: "satışa hazır", value: "3"  },
    { label: "toplam değer", value: "₺2.840" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      {/* Topbar */}
      <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between bg-[#F7F3ED]">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">Projelerim</h1>
          <p className="text-xs text-[#9C8B81] mt-0.5">12 çalışma · 5 devam ediyor</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#EDE7DF] rounded-full px-4 py-2 text-sm text-[#9C8B81] border border-[#D0C7C0]">
            🔍 Ara...
          </div>
          <button className="bg-[#8FAF8A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6B9A67] transition-colors">
            + Yeni Proje
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-8 py-3 flex gap-2 border-b border-[#E4DBD4]">
        {["Tümü", "Tamamlandı", "Devam ediyor", "Fikir aşaması"].map((f, i) => (
          <span key={f} className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-all
            ${i === 0
              ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
              : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"
            }`}>
            {f}
          </span>
        ))}
      </div>

      <div className="px-8 py-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E4DBD4] p-4 text-center">
              <div className="font-serif text-xl font-semibold text-[#3a2e26]">{s.value}</div>
              <div className="text-xs text-[#9C8B81] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p) => {
            const st = statusMap[p.status];
            return (
              <div key={p.id} className="bg-white rounded-[14px] border border-[#E4DBD4] overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className={`h-44 bg-gradient-to-br ${p.bg} flex items-center justify-center relative`}>
                  <span className="text-5xl opacity-30">🪡</span>
                  <span className={`absolute top-2.5 right-2.5 text-xs px-2.5 py-1 rounded-lg font-medium ${st.cls}`}>
                    {st.label}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="font-serif text-sm font-medium text-[#3a2e26] mb-1">{p.name}</p>
                  <p className="text-xs text-[#9C8B81]">{p.size} · {p.colors} renk · {p.hours > 0 ? `${p.hours} saat` : "süre belirsiz"}</p>
                </div>
              </div>
            );
          })}

          {/* Add new card */}
          <div className="rounded-[14px] border-2 border-dashed border-[#D0C7C0] flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-[#EDE7DF] transition-colors">
            <span className="text-3xl text-[#C0B5AD] mb-2">+</span>
            <span className="text-xs text-[#B0A096]">Yeni proje</span>
          </div>
        </div>
      </div>
    </div>
  );
}
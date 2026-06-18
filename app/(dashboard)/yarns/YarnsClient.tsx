"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Yarn } from "@/lib/types";
import NewYarnModal from "@/components/yarns/NewYarnModal";
import { supabase } from "@/lib/supabase";

interface Props {
  initialYarns: Yarn[];
}

const BRANDS      = ["Tümü", "DMC", "Anchor", "Yarnart", "Alize", "Drops", "Diğer"];
const COLOR_GROUPS = [
  { label: "Kırmızı / Pembe", value: "red",    hex: "#E57373" },
  { label: "Turuncu",         value: "orange",  hex: "#FFB74D" },
  { label: "Sarı",            value: "yellow",  hex: "#FFF176" },
  { label: "Yeşil",           value: "green",   hex: "#81C784" },
  { label: "Mavi",            value: "blue",    hex: "#64B5F6" },
  { label: "Mor / Lila",      value: "purple",  hex: "#BA68C8" },
  { label: "Kahve / Bej",     value: "brown",   hex: "#A1887F" },
  { label: "Gri / Siyah",     value: "gray",    hex: "#90A4AE" },
  { label: "Beyaz / Krem",    value: "white",   hex: "#F5F5F5" },
];

export default function YarnsClient({ initialYarns }: Props) {
  const [yarns, setYarns]             = useState<Yarn[]>(initialYarns);
  const [showModal, setShowModal]     = useState(false);
  const [brandFilter, setBrandFilter] = useState("Tümü");
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [selected, setSelected]       = useState<Yarn | null>(null);

  const fetchYarns = async () => {
    const { data, error } = await supabase
      .from("yarns")
      .select("*")
      .order("brand", { ascending: true });
    if (!error && data) setYarns(data);
  };

  const filtered = yarns.filter(y => {
    const brandOk = brandFilter === "Tümü" || y.brand === brandFilter;
    const colorOk = !colorFilter || y.color_group === colorFilter;
    return brandOk && colorOk;
  });

  const lowStock = yarns.filter(y => y.stock_count <= 1).length;

  return (
    <div className="min-h-screen bg-[#F7F3ED] flex">
      {showModal && (
        <NewYarnModal onClose={() => setShowModal(false)} onSaved={fetchYarns} />
      )}

      {/* Ana içerik */}
      <div className="flex-1">
        {/* Topbar */}
        <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">İplik Deposu</h1>
            <p className="text-xs text-[#9C8B81] mt-0.5">
              {yarns.length} renk · {[...new Set(yarns.map(y => y.brand))].length} marka
              {lowStock > 0 && <span className="text-[#8C4A1A] ml-2">· {lowStock} düşük stok</span>}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#8FAF8A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6B9A67] transition-colors"
          >
            + Yeni İplik
          </button>
        </div>

        {/* Marka filtreleri */}
        <div className="px-8 py-3 border-b border-[#E4DBD4] flex gap-2 flex-wrap">
          {BRANDS.map(b => (
            <button
              key={b}
              onClick={() => setBrandFilter(b)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all
                ${brandFilter === b
                  ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                  : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Renk grubu filtreleri */}
        <div className="px-8 py-3 border-b border-[#E4DBD4] flex gap-2 flex-wrap items-center">
          <span className="text-xs text-[#9C8B81] mr-1">Renk:</span>
          {colorFilter && (
            <button
              onClick={() => setColorFilter(null)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-[#EDE7DF] text-[#7A6A60] border border-[#D0C7C0]"
            >
              <X size={10} /> Temizle
            </button>
          )}
          {COLOR_GROUPS.map(g => (
            <button
              key={g.value}
              onClick={() => setColorFilter(colorFilter === g.value ? null : g.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${colorFilter === g.value
                  ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                  : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"}`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.hex }} />
              {g.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="px-8 py-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-24 gap-3">
              <div className="w-16 h-16 rounded-full bg-[#EDE7DF] flex items-center justify-center text-3xl">🧵</div>
              <p className="font-serif text-lg text-[#3a2e26]">İplik bulunamadı</p>
              <p className="text-sm text-[#9C8B81]">Filtreyi değiştir veya yeni iplik ekle.</p>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-3">
              {filtered.map(y => (
                <div
                  key={y.id}
                  onClick={() => setSelected(y)}
                  className={`bg-white rounded-[14px] border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md p-3 flex flex-col items-center gap-2
                    ${selected?.id === y.id ? "border-[#D4A899] shadow-md" : "border-[#E4DBD4]"}`}
                >
                  {/* Makara görseli */}
                  <div
                    className="w-14 h-14 rounded-full border-4 flex items-center justify-center"
                    style={{ borderColor: y.color_hex ?? "#E4DBD4", background: y.color_hex ? `${y.color_hex}22` : "#F7F3ED" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E4DBD4]" />
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-medium text-[#3a2e26] leading-tight">{y.color_name}</p>
                    <p className="text-[10px] text-[#9C8B81] mt-0.5">{y.brand} · {y.code}</p>
                  </div>

                  {/* Stok badge */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                    ${y.stock_count <= 1
                      ? "bg-[#FDE8D0] text-[#8C4A1A]"
                      : "bg-[#D6EAD4] text-[#3a6636]"}`}
                  >
                    {y.stock_count <= 1 ? "! az" : `${y.stock_count} adet`}
                  </span>
                </div>
              ))}

              {/* Yeni ekle */}
              <div
                onClick={() => setShowModal(true)}
                className="rounded-[14px] border-2 border-dashed border-[#D0C7C0] flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-[#EDE7DF] transition-colors"
              >
                <span className="text-2xl text-[#C0B5AD] mb-1">+</span>
                <span className="text-xs text-[#B0A096]">Yeni iplik</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sağ detay paneli */}
      {selected && (
        <div className="w-64 border-l border-[#E4DBD4] bg-white p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-[#3a2e26]">Detay</h3>
            <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#EDE7DF]">
              <X size={14} className="text-[#9C8B81]" />
            </button>
          </div>

          {/* Renk önizleme */}
          <div
            className="w-full h-20 rounded-xl border border-[#E4DBD4]"
            style={{ background: selected.color_hex ?? "#F7F3ED" }}
          />

          <div className="flex flex-col gap-2.5">
            {[
              { label: "Marka",      value: selected.brand },
              { label: "Kod",        value: selected.code },
              { label: "Renk",       value: selected.color_name },
              { label: "Stok",       value: `${selected.stock_count} adet` },
              { label: "Fiyat",      value: selected.unit_price ? `₺${selected.unit_price}` : "—" },
              { label: "Gram",       value: selected.gram ? `${selected.gram}g` : "—" },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm border-b border-[#F0EBE6] pb-2">
                <span className="text-[#9C8B81]">{row.label}</span>
                <span className="text-[#3a2e26] font-medium">{row.value}</span>
              </div>
            ))}
            {selected.notes && (
              <div className="text-xs text-[#9C8B81] mt-1 bg-[#F7F3ED] rounded-lg p-2.5">
                {selected.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
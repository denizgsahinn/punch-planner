"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

const BRANDS = ["DMC", "Anchor", "Yarnart", "Alize", "Drops", "Diğer"];

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

export default function NewYarnModal({ onClose, onSaved }: Props) {
  const [brand, setBrand]           = useState("DMC");
  const [code, setCode]             = useState("");
  const [colorName, setColorName]   = useState("");
  const [colorHex, setColorHex]     = useState("#E8C4B8");
  const [colorGroup, setColorGroup] = useState("red");
  const [stockCount, setStockCount] = useState("1");
  const [unitPrice, setUnitPrice]   = useState("");
  const [gram, setGram]             = useState("");
  const [notes, setNotes]           = useState("");
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [preview, setPreview]       = useState<string | null>(null);
  const [saving, setSaving]         = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!code.trim() || !colorName.trim()) return;
    setSaving(true);

    let image_url: string | null = null;

    if (imageFile) {
      const ext      = imageFile.name.split(".").pop();
      const fileName = `yarn_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("punch-images")
        .upload(fileName, imageFile);
      if (!uploadError) {
        const { data } = supabase.storage
          .from("punch-images")
          .getPublicUrl(fileName);
        image_url = data.publicUrl;
      }
    }

    const { error } = await supabase.from("yarns").insert({
      brand,
      code:        code.trim(),
      color_name:  colorName.trim(),
      color_hex:   colorHex,
      color_group: colorGroup,
      stock_count: parseInt(stockCount) || 1,
      unit_price:  unitPrice  ? parseFloat(unitPrice)  : null,
      gram:        gram       ? parseFloat(gram)        : null,
      notes:       notes.trim() || null,
      image_url,
    });

    setSaving(false);
    if (!error) { onSaved(); onClose(); }
    else console.error(error);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#E4DBD4] w-full max-w-lg mx-4 shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4DBD4]">
          <h2 className="font-serif text-xl font-semibold text-[#3a2e26]">Yeni İplik</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EDE7DF] transition-colors">
            <X size={16} className="text-[#9C8B81]" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">

          {/* Fotoğraf */}
          <label className="cursor-pointer">
            <div className={`w-full h-28 rounded-xl border-2 border-dashed border-[#D0C7C0] flex flex-col items-center justify-center gap-2 hover:bg-[#F7F3ED] transition-colors overflow-hidden ${preview ? "border-solid border-[#E4DBD4]" : ""}`}>
              {preview ? (
                <img src={preview} alt="önizleme" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload size={18} className="text-[#B0A096]" />
                  <span className="text-xs text-[#9C8B81]">İplik fotoğrafı ekle</span>
                </>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>

          {/* Marka */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1.5 block">Marka</label>
            <div className="flex gap-2 flex-wrap">
              {BRANDS.map(b => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                    ${brand === b
                      ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                      : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Kod + Renk adı */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">İplik kodu *</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="örn. 3713"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Renk adı *</label>
              <input
                type="text"
                value={colorName}
                onChange={e => setColorName(e.target.value)}
                placeholder="örn. Salmon Pink"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
          </div>

          {/* Renk hex + Renk grubu */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1.5 block">Renk</label>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="color"
                value={colorHex}
                onChange={e => setColorHex(e.target.value)}
                className="w-10 h-10 rounded-lg border border-[#E4DBD4] cursor-pointer p-0.5 bg-white"
              />
              <span className="text-sm text-[#9C8B81]">{colorHex}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {COLOR_GROUPS.map(g => (
                <button
                  key={g.value}
                  onClick={() => { setColorGroup(g.value); setColorHex(g.hex); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                    ${colorGroup === g.value
                      ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                      : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: g.hex }} />
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fiyat + Gram + Stok */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Birim fiyat (₺)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={e => setUnitPrice(e.target.value)}
                placeholder="18.50"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Gram</label>
              <input
                type="number"
                value={gram}
                onChange={e => setGram(e.target.value)}
                placeholder="8"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Stok (adet)</label>
              <input
                type="number"
                value={stockCount}
                onChange={e => setStockCount(e.target.value)}
                placeholder="1"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1 block">Notlar</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="İplik kalitesi, nereden aldın..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E4DBD4] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-[#7A6A60] border border-[#D0C7C0] hover:bg-[#EDE7DF] transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={!code.trim() || !colorName.trim() || saving}
            className="px-5 py-2 rounded-full text-sm text-white bg-[#8FAF8A] hover:bg-[#6B9A67] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
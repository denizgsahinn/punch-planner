"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ProjectStatus } from "@/lib/types";


interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function NewProjectModal({ onClose, onSaved }: Props) {
  const [name, setName]           = useState("");
  const [widthCm, setWidthCm]     = useState("");
  const [heightCm, setHeightCm]   = useState("");
  const [status, setStatus]       = useState<ProjectStatus>("idea");
  const [hoursTotal, setHoursTotal] = useState("");
  const [notes, setNotes]         = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview]     = useState<string | null>(null);
  const [saving, setSaving]       = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);

    let image_url: string | null = null;

    // Fotoğraf varsa Storage'a yükle
    if (imageFile) {
      const ext      = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
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

    // Projeyi kaydet
    const { error } = await supabase.from("projects").insert({
      name:        name.trim(),
      width_cm:    widthCm  ? parseFloat(widthCm)  : null,
      height_cm:   heightCm ? parseFloat(heightCm) : null,
      status,
      hours_total: hoursTotal ? parseFloat(hoursTotal) : null,
      notes:       notes.trim() || null,
      image_url,
    });

    setSaving(false);
    if (!error) {
      onSaved();
      onClose();
    } else {
      console.error(error);
    }
  };

  const statusOptions: { value: ProjectStatus; label: string }[] = [
    { value: "idea",     label: "✦ Fikir aşaması" },
    { value: "wip",      label: "⟳ Devam ediyor"  },
    { value: "done",     label: "✓ Tamamlandı"     },
    { value: "for_sale", label: "🏷 Satışa hazır"  },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#E4DBD4] w-full max-w-lg mx-4 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4DBD4]">
          <h2 className="font-serif text-xl font-semibold text-[#3a2e26]">Yeni Proje</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EDE7DF] transition-colors">
            <X size={16} className="text-[#9C8B81]" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">

          {/* Fotoğraf yükleme */}
          <label className="cursor-pointer">
            <div className={`w-full h-36 rounded-xl border-2 border-dashed border-[#D0C7C0] flex flex-col items-center justify-center gap-2 hover:bg-[#F7F3ED] transition-colors overflow-hidden ${preview ? "border-solid border-[#E4DBD4]" : ""}`}>
              {preview ? (
                <img src={preview} alt="önizleme" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload size={20} className="text-[#B0A096]" />
                  <span className="text-xs text-[#9C8B81]">Fotoğraf yükle</span>
                </>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>

          {/* Proje adı */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1 block">Proje adı *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="örn. Gül Çelengi"
              className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
            />
          </div>

          {/* Boyutlar */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Genişlik (cm)</label>
              <input
                type="number"
                value={widthCm}
                onChange={e => setWidthCm(e.target.value)}
                placeholder="20"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Yükseklik (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                placeholder="20"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#9C8B81] mb-1 block">Tahmini süre (saat)</label>
              <input
                type="number"
                value={hoursTotal}
                onChange={e => setHoursTotal(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E4DBD4] text-sm text-[#3a2e26] bg-[#F7F3ED] focus:outline-none focus:border-[#D4A899] placeholder:text-[#C0B5AD]"
              />
            </div>
          </div>

          {/* Durum */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1.5 block">Durum</label>
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                    ${status === opt.value
                      ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                      : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label className="text-xs text-[#9C8B81] mb-1 block">Notlar</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Kullandığın iğne numarası, kumaş türü, fikirler..."
              rows={3}
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
            disabled={!name.trim() || saving}
            className="px-5 py-2 rounded-full text-sm text-white bg-[#8FAF8A] hover:bg-[#6B9A67] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
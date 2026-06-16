"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/types";
import NewProjectModal from "@/components/projects/NewProjectModal";

interface Props {
  initialProjects: Project[];
}

export default function GalleryClient({ initialProjects }: Props) {
  const [projects, setProjects]   = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProjects(data);
  };

  const statusMap: Record<string, { label: string; cls: string }> = {
    done:     { label: "✓ Bitti",    cls: "bg-[#D6EAD4] text-[#3a6636]" },
    wip:      { label: "⟳ Devam",   cls: "bg-[#FDE8D0] text-[#8C4A1A]" },
    idea:     { label: "✦ Fikir",    cls: "bg-[#E4DCF0] text-[#5a3d8a]" },
    for_sale: { label: "🏷 Satışta", cls: "bg-[#D0E8F0] text-[#1a5a6a]" },
  };

  const bgColors = [
    "from-[#F2E2D4] to-[#E8C4B8]",
    "from-[#DCE8D8] to-[#B8D4B4]",
    "from-[#E0DCF0] to-[#C4BEDE]",
    "from-[#F7EDD5] to-[#F0D89A]",
    "from-[#F5E2E2] to-[#EAB8B8]",
  ];

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onSaved={fetchProjects}
        />
      )}

      {/* Topbar */}
      <div className="px-8 py-5 border-b border-[#E4DBD4] flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#3a2e26]">Projelerim</h1>
          <p className="text-xs text-[#9C8B81] mt-0.5">{projects.length} çalışma</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#8FAF8A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6B9A67] transition-colors"
        >
          + Yeni Proje
        </button>
      </div>

      {/* Filter chips */}
      <div className="px-8 py-3 flex gap-2 border-b border-[#E4DBD4]">
        {["Tümü", "Tamamlandı", "Devam ediyor", "Fikir aşaması"].map((f, i) => (
          <span
            key={f}
            className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-all
              ${i === 0
                ? "bg-[#E8C4B8] border-[#D4A899] text-[#6B3A2A]"
                : "border-[#D0C7C0] text-[#7A6A60] hover:bg-[#EDE7DF]"}`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="px-8 py-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "toplam proje", value: projects.length },
            { label: "devam ediyor", value: projects.filter(p => p.status === "wip").length },
            { label: "tamamlandı",   value: projects.filter(p => p.status === "done").length },
            { label: "satışa hazır", value: projects.filter(p => p.status === "for_sale").length },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E4DBD4] p-4 text-center">
              <div className="font-serif text-xl font-semibold text-[#3a2e26]">{s.value}</div>
              <div className="text-xs text-[#9C8B81] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {projects.map((p, i) => {
              const st = statusMap[p.status];
              const bg = bgColors[i % bgColors.length];
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-[14px] border border-[#E4DBD4] overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className={`h-44 bg-gradient-to-br ${bg} relative flex items-center justify-center`}>
                    {p.image_url ? (
                      <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                    ) : (
                      <span className="text-5xl opacity-20">🪡</span>
                    )}
                    <span className={`absolute top-2.5 right-2.5 z-10 text-xs px-2.5 py-1 rounded-lg font-medium ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <p className="font-serif text-sm font-medium text-[#3a2e26] mb-1">{p.name}</p>
                    <p className="text-xs text-[#9C8B81]">
                      {p.width_cm && p.height_cm ? `${p.width_cm}×${p.height_cm} cm · ` : ""}
                      {p.hours_spent > 0 ? `${p.hours_spent} saat` : "henüz başlanmadı"}
                    </p>
                  </div>
                </div>
              );
            })}

            <div
              onClick={() => setShowModal(true)}
              className="rounded-[14px] border-2 border-dashed border-[#D0C7C0] flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-[#EDE7DF] transition-colors"
            >
              <span className="text-3xl text-[#C0B5AD] mb-2">+</span>
              <span className="text-xs text-[#B0A096]">Yeni proje</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-24 gap-3">
            <div className="w-16 h-16 rounded-full bg-[#EDE7DF] flex items-center justify-center text-3xl">🪡</div>
            <p className="font-serif text-lg text-[#3a2e26]">Henüz proje yok</p>
            <p className="text-sm text-[#9C8B81]">İlk punch projenizi ekleyin!</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 bg-[#8FAF8A] text-white text-sm px-5 py-2 rounded-full hover:bg-[#6B9A67] transition-colors"
            >
              + Yeni Proje Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
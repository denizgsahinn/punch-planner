"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, Layers, Calculator, Heart, Settings } from "lucide-react";

const navItems = [
  { href: "/gallery",     icon: Images,     label: "Projeler"  },
  { href: "/yarns",       icon: Layers,    label: "İplikler"  },
  { href: "/cost",        icon: Calculator, label: "Maliyet"   },
  { href: "/inspiration", icon: Heart,      label: "İlham"     },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 min-h-screen bg-[#EDE7DF] border-r border-[#E4DBD4] flex flex-col items-center py-5 gap-3 fixed left-0 top-0 bottom-0 z-50">
      {/* Logo */}
      <div className="w-9 h-9 rounded-full bg-[#C4BEDE] flex items-center justify-center mb-3">
        <span className="text-white font-serif font-semibold text-sm">P</span>
      </div>

      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
              ${isActive
                ? "bg-[#E8C4B8] text-[#6B3A2A] shadow-sm"
                : "text-[#9C8B81] hover:bg-[#F7F3ED] hover:text-[#6B4C3B]"
              }`}
          >
            <Icon size={20} />
          </Link>
        );
      })}

      <Link
        href="/settings"
        title="Ayarlar"
        className="mt-auto w-11 h-11 rounded-xl flex items-center justify-center text-[#9C8B81] hover:bg-[#F7F3ED] hover:text-[#6B4C3B] transition-all"
      >
        <Settings size={20} />
      </Link>
    </aside>
  );
}
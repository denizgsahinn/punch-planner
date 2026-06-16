import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/types";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return <GalleryClient initialProjects={(projects as Project[]) ?? []} />;
}
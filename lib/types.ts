export type ProjectStatus = "idea" | "wip" | "done" | "for_sale";

export interface Project {
  id: string;
  name: string;
  width_cm: number | null;
  height_cm: number | null;
  status: ProjectStatus;
  hours_spent: number;
  hours_total: number | null;
  notes: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Yarn {
  id: string;
  brand: string;
  code: string;
  color_name: string;
  color_hex: string | null;
  color_group: string | null;
  stock_count: number;
  unit_price: number | null;
  gram: number | null;
  image_url: string | null;
  notes: string | null;
  created_at: string;
}

export interface CostItem {
  id: string;
  project_id: string;
  label: string;
  amount: number;
  created_at: string;
}

export interface ProjectYarn {
  id: string;
  project_id: string;
  yarn_id: string;
  amount_used: number | null;
  yarn?: Yarn;
}
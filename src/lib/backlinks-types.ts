export type BacklinkType = "parceria" | "guest_post" | "publicacao" | "mencao" | "diretorio";
export type BacklinkStatus =
  | "prospect"
  | "contatado"
  | "negociando"
  | "aceito"
  | "publicado"
  | "recusado"
  | "arquivado";
export type BacklinkPriority = "alta" | "media" | "baixa";

export interface BacklinkTarget {
  id: string;
  domain: string;
  domain_authority: number | null;
  type: BacklinkType;
  status: BacklinkStatus;
  priority: BacklinkPriority;
  contact_name: string | null;
  contact_email: string | null;
  contact_url: string | null;
  pitch_angle: string | null;
  target_blog_slug: string | null;
  proposed_anchor: string | null;
  published_url: string | null;
  published_anchor: string | null;
  dofollow: boolean;
  value_estimated_brl: number | null;
  notes: string | null;
  next_action_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BacklinkGoal {
  id: string;
  month: string; // YYYY-MM-01
  target_count: number;
  target_avg_da: number;
  notes: string | null;
}

export const STATUS_LABEL: Record<BacklinkStatus, string> = {
  prospect: "Prospect",
  contatado: "Contatado",
  negociando: "Negociando",
  aceito: "Aceito",
  publicado: "Publicado",
  recusado: "Recusado",
  arquivado: "Arquivado",
};

export const TYPE_LABEL: Record<BacklinkType, string> = {
  parceria: "Parceria",
  guest_post: "Guest post",
  publicacao: "Publicação",
  mencao: "Menção",
  diretorio: "Diretório",
};

export const PRIORITY_LABEL: Record<BacklinkPriority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export const PIPELINE_STATUSES: BacklinkStatus[] = [
  "prospect",
  "contatado",
  "negociando",
  "aceito",
  "publicado",
  "recusado",
];

export const ALL_STATUSES: BacklinkStatus[] = [...PIPELINE_STATUSES, "arquivado"];
export const ALL_TYPES: BacklinkType[] = ["parceria", "guest_post", "publicacao", "mencao", "diretorio"];
export const ALL_PRIORITIES: BacklinkPriority[] = ["alta", "media", "baixa"];

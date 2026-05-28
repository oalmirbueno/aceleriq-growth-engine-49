export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      backlink_goals: {
        Row: {
          created_at: string
          id: string
          month: string
          notes: string | null
          target_avg_da: number
          target_count: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          month: string
          notes?: string | null
          target_avg_da?: number
          target_count?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          month?: string
          notes?: string | null
          target_avg_da?: number
          target_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      backlink_targets: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_url: string | null
          created_at: string
          dofollow: boolean
          domain: string
          domain_authority: number | null
          id: string
          next_action_at: string | null
          notes: string | null
          pitch_angle: string | null
          priority: Database["public"]["Enums"]["backlink_priority"]
          proposed_anchor: string | null
          published_anchor: string | null
          published_at: string | null
          published_url: string | null
          status: Database["public"]["Enums"]["backlink_status"]
          target_blog_slug: string | null
          type: Database["public"]["Enums"]["backlink_type"]
          updated_at: string
          value_estimated_brl: number | null
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_url?: string | null
          created_at?: string
          dofollow?: boolean
          domain: string
          domain_authority?: number | null
          id?: string
          next_action_at?: string | null
          notes?: string | null
          pitch_angle?: string | null
          priority?: Database["public"]["Enums"]["backlink_priority"]
          proposed_anchor?: string | null
          published_anchor?: string | null
          published_at?: string | null
          published_url?: string | null
          status?: Database["public"]["Enums"]["backlink_status"]
          target_blog_slug?: string | null
          type?: Database["public"]["Enums"]["backlink_type"]
          updated_at?: string
          value_estimated_brl?: number | null
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_url?: string | null
          created_at?: string
          dofollow?: boolean
          domain?: string
          domain_authority?: number | null
          id?: string
          next_action_at?: string | null
          notes?: string | null
          pitch_angle?: string | null
          priority?: Database["public"]["Enums"]["backlink_priority"]
          proposed_anchor?: string | null
          published_anchor?: string | null
          published_at?: string | null
          published_url?: string | null
          status?: Database["public"]["Enums"]["backlink_status"]
          target_blog_slug?: string | null
          type?: Database["public"]["Enums"]["backlink_type"]
          updated_at?: string
          value_estimated_brl?: number | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string
          focus_keyword: string | null
          id: string
          published_at: string | null
          review_notes: Json
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["blog_post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          focus_keyword?: string | null
          id?: string
          published_at?: string | null
          review_notes?: Json
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["blog_post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          focus_keyword?: string | null
          id?: string
          published_at?: string | null
          review_notes?: Json
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["blog_post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_topic_queue: {
        Row: {
          angle: string
          attempts: number
          category: string
          created_at: string
          focus_keyword: string
          generated_post_id: string | null
          id: string
          last_error: string | null
          priority: number
          scheduled_for: string | null
          status: Database["public"]["Enums"]["topic_queue_status"]
          title: string
          updated_at: string
        }
        Insert: {
          angle?: string
          attempts?: number
          category?: string
          created_at?: string
          focus_keyword: string
          generated_post_id?: string | null
          id?: string
          last_error?: string | null
          priority?: number
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["topic_queue_status"]
          title: string
          updated_at?: string
        }
        Update: {
          angle?: string
          attempts?: number
          category?: string
          created_at?: string
          focus_keyword?: string
          generated_post_id?: string | null
          id?: string
          last_error?: string | null
          priority?: number
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["topic_queue_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      diagnostico_leads: {
        Row: {
          cidade: string | null
          classificacao: string
          created_at: string
          empresa: string
          faturamento_mensal: string
          id: string
          interesse_principal: string
          investe_trafego: string | null
          nome: string
          origem: string | null
          principal_gargalo: string
          recomendacoes: Json
          respostas: Json
          score: number
          segmento: string | null
          site_instagram: string | null
          tem_equipe_comercial: string | null
          usa_crm: string | null
          whatsapp: string
        }
        Insert: {
          cidade?: string | null
          classificacao?: string
          created_at?: string
          empresa: string
          faturamento_mensal: string
          id?: string
          interesse_principal: string
          investe_trafego?: string | null
          nome: string
          origem?: string | null
          principal_gargalo: string
          recomendacoes?: Json
          respostas?: Json
          score?: number
          segmento?: string | null
          site_instagram?: string | null
          tem_equipe_comercial?: string | null
          usa_crm?: string | null
          whatsapp: string
        }
        Update: {
          cidade?: string | null
          classificacao?: string
          created_at?: string
          empresa?: string
          faturamento_mensal?: string
          id?: string
          interesse_principal?: string
          investe_trafego?: string | null
          nome?: string
          origem?: string | null
          principal_gargalo?: string
          recomendacoes?: Json
          respostas?: Json
          score?: number
          segmento?: string | null
          site_instagram?: string | null
          tem_equipe_comercial?: string | null
          usa_crm?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      indexation_status: {
        Row: {
          alert_active: boolean
          alert_since: string | null
          consecutive_failures: number
          coverage_state: string | null
          created_at: string
          first_seen_at: string
          google_canonical: string | null
          indexing_state: string | null
          inspection_url: string | null
          last_checked_at: string | null
          last_crawl_time: string | null
          last_error: string | null
          page_fetch_state: string | null
          published_at: string | null
          robots_txt_state: string | null
          source: string
          updated_at: string
          url: string
          user_canonical: string | null
          verdict: string | null
        }
        Insert: {
          alert_active?: boolean
          alert_since?: string | null
          consecutive_failures?: number
          coverage_state?: string | null
          created_at?: string
          first_seen_at?: string
          google_canonical?: string | null
          indexing_state?: string | null
          inspection_url?: string | null
          last_checked_at?: string | null
          last_crawl_time?: string | null
          last_error?: string | null
          page_fetch_state?: string | null
          published_at?: string | null
          robots_txt_state?: string | null
          source?: string
          updated_at?: string
          url: string
          user_canonical?: string | null
          verdict?: string | null
        }
        Update: {
          alert_active?: boolean
          alert_since?: string | null
          consecutive_failures?: number
          coverage_state?: string | null
          created_at?: string
          first_seen_at?: string
          google_canonical?: string | null
          indexing_state?: string | null
          inspection_url?: string | null
          last_checked_at?: string | null
          last_crawl_time?: string | null
          last_error?: string | null
          page_fetch_state?: string | null
          published_at?: string | null
          robots_txt_state?: string | null
          source?: string
          updated_at?: string
          url?: string
          user_canonical?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      layout_overrides: {
        Row: {
          height: number | null
          id: string
          opacity: number
          rotation: number
          scale: number
          updated_at: string
          width: number | null
          x: number
          y: number
          z_index: number
        }
        Insert: {
          height?: number | null
          id: string
          opacity?: number
          rotation?: number
          scale?: number
          updated_at?: string
          width?: number | null
          x?: number
          y?: number
          z_index?: number
        }
        Update: {
          height?: number | null
          id?: string
          opacity?: number
          rotation?: number
          scale?: number
          updated_at?: string
          width?: number | null
          x?: number
          y?: number
          z_index?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      backlink_priority: "alta" | "media" | "baixa"
      backlink_status:
        | "prospect"
        | "contatado"
        | "negociando"
        | "aceito"
        | "publicado"
        | "recusado"
        | "arquivado"
      backlink_type:
        | "parceria"
        | "guest_post"
        | "publicacao"
        | "mencao"
        | "diretorio"
      blog_post_status: "draft" | "in_review" | "approved" | "published"
      topic_queue_status:
        | "pending"
        | "generating"
        | "published"
        | "skipped"
        | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      backlink_priority: ["alta", "media", "baixa"],
      backlink_status: [
        "prospect",
        "contatado",
        "negociando",
        "aceito",
        "publicado",
        "recusado",
        "arquivado",
      ],
      backlink_type: [
        "parceria",
        "guest_post",
        "publicacao",
        "mencao",
        "diretorio",
      ],
      blog_post_status: ["draft", "in_review", "approved", "published"],
      topic_queue_status: [
        "pending",
        "generating",
        "published",
        "skipped",
        "failed",
      ],
    },
  },
} as const

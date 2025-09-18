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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      deletion_confirmations: {
        Row: {
          confirmed_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          ip_address: unknown | null
          privacy_request_id: string
          token: string
          updated_at: string | null
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          ip_address?: unknown | null
          privacy_request_id: string
          token: string
          updated_at?: string | null
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          privacy_request_id?: string
          token?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deletion_confirmations_privacy_request_fkey"
            columns: ["privacy_request_id"]
            isOneToOne: false
            referencedRelation: "privacy_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      deletion_rate_limits: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          request_count: number | null
          updated_at: string | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address: unknown
          request_count?: number | null
          updated_at?: string | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          request_count?: number | null
          updated_at?: string | null
          window_start?: string | null
        }
        Relationships: []
      }
      privacy_requests: {
        Row: {
          additional_info: string | null
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          email: string
          id: string
          processed_by: string | null
          request_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          additional_info?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          processed_by?: string | null
          request_type: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          additional_info?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          processed_by?: string | null
          request_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          age: number | null
          country_code: string | null
          created_at: string | null
          data_processing_opt_out: boolean | null
          data_processing_opt_out_date: string | null
          email: string
          gender: string | null
          id: string
          is_verified: boolean | null
          marketing_opt_out: boolean | null
          marketing_opt_out_date: string | null
          notes: string | null
          referrer: string | null
          source: string | null
          updated_at: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          verification_token: string | null
        }
        Insert: {
          age?: number | null
          country_code?: string | null
          created_at?: string | null
          data_processing_opt_out?: boolean | null
          data_processing_opt_out_date?: string | null
          email: string
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          marketing_opt_out?: boolean | null
          marketing_opt_out_date?: string | null
          notes?: string | null
          referrer?: string | null
          source?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_token?: string | null
        }
        Update: {
          age?: number | null
          country_code?: string | null
          created_at?: string | null
          data_processing_opt_out?: boolean | null
          data_processing_opt_out_date?: string | null
          email?: string
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          marketing_opt_out?: boolean | null
          marketing_opt_out_date?: string | null
          notes?: string | null
          referrer?: string | null
          source?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      opted_out_users: {
        Row: {
          age: number | null
          created_at: string | null
          data_processing_opt_out: boolean | null
          data_processing_opt_out_date: string | null
          email: string | null
          gender: string | null
          id: string | null
          marketing_opt_out: boolean | null
          marketing_opt_out_date: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          data_processing_opt_out?: boolean | null
          data_processing_opt_out_date?: string | null
          email?: string | null
          gender?: string | null
          id?: string | null
          marketing_opt_out?: boolean | null
          marketing_opt_out_date?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          data_processing_opt_out?: boolean | null
          data_processing_opt_out_date?: string | null
          email?: string | null
          gender?: string | null
          id?: string | null
          marketing_opt_out?: boolean | null
          marketing_opt_out_date?: string | null
        }
        Relationships: []
      }
      privacy_requests_analytics: {
        Row: {
          avg_completion_days: number | null
          request_count: number | null
          request_date: string | null
          request_type: string | null
          status: string | null
        }
        Relationships: []
      }
      waitlist_analytics: {
        Row: {
          country_code: string | null
          cumulative_signups: number | null
          daily_signups: number | null
          gender: string | null
          signup_date: string | null
          source: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_waitlist_signup: {
        Args:
          | {
              p_age: number
              p_country_code?: string
              p_email: string
              p_gender: string
              p_referrer?: string
              p_source?: string
              p_user_agent?: string
              p_utm_campaign?: string
              p_utm_medium?: string
              p_utm_source?: string
            }
          | {
              p_country_code?: string
              p_email: string
              p_gender?: string
              p_referrer?: string
              p_source?: string
              p_user_agent?: string
              p_utm_campaign?: string
              p_utm_medium?: string
              p_utm_source?: string
            }
          | {
              p_email: string
              p_gender?: string
              p_ip_address?: unknown
              p_referrer?: string
              p_source?: string
              p_user_agent?: string
              p_utm_campaign?: string
              p_utm_medium?: string
              p_utm_source?: string
            }
        Returns: Json
      }
      check_deletion_rate_limit: {
        Args: { p_ip_address: unknown }
        Returns: boolean
      }
      cleanup_expired_deletion_confirmations: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      confirm_deletion: {
        Args: { p_token: string }
        Returns: Json
      }
      create_deletion_confirmation: {
        Args: {
          p_email: string
          p_expires_at: string
          p_ip_address: unknown
          p_privacy_request_id: string
          p_token: string
        }
        Returns: Json
      }
      delete_user_data: {
        Args: { p_email: string }
        Returns: Json
      }
      get_opt_out_status: {
        Args: { p_email: string }
        Returns: Json
      }
      get_signup_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_signup_count_by_gender: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
          gender: string
        }[]
      }
      get_user_data_export: {
        Args: { p_email: string }
        Returns: Json
      }
      process_data_processing_opt_out: {
        Args: { p_email: string }
        Returns: Json
      }
      process_marketing_opt_out: {
        Args: { p_email: string }
        Returns: Json
      }
      submit_privacy_request: {
        Args: {
          p_additional_info?: string
          p_email: string
          p_request_type: string
        }
        Returns: Json
      }
      update_deletion_rate_limit: {
        Args: { p_ip_address: unknown }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

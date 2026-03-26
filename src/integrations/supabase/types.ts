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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_content: {
        Row: {
          access_level: string
          age_group: string | null
          category: string | null
          content_type: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          access_level?: string
          age_group?: string | null
          category?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          access_level?: string
          age_group?: string | null
          category?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      child_caregivers: {
        Row: {
          child_id: string
          created_at: string
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["caregiver_role"]
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["caregiver_role"]
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["caregiver_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_caregivers_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age_months: number
          created_at: string
          family_id: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          age_months?: number
          created_at?: string
          family_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Update: {
          age_months?: number
          created_at?: string
          family_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      content_videos: {
        Row: {
          created_at: string
          cycle_number: number
          description: string | null
          id: string
          is_published: boolean
          title: string
          video_order: number
          video_path: string
        }
        Insert: {
          created_at?: string
          cycle_number: number
          description?: string | null
          id?: string
          is_published?: boolean
          title: string
          video_order?: number
          video_path: string
        }
        Update: {
          created_at?: string
          cycle_number?: number
          description?: string | null
          id?: string
          is_published?: boolean
          title?: string
          video_order?: number
          video_path?: string
        }
        Relationships: []
      }
      content_views: {
        Row: {
          content_id: string | null
          content_title: string | null
          id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          content_id?: string | null
          content_title?: string | null
          id?: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          content_id?: string | null
          content_title?: string | null
          id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_views_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "app_content"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_insights: {
        Row: {
          child_id: string
          created_at: string
          family_id: string | null
          id: string
          insight_date: string
          insight_text: string
          support_sugg: string | null
          title: string
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          family_id?: string | null
          id?: string
          insight_date?: string
          insight_text: string
          support_sugg?: string | null
          title: string
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          family_id?: string | null
          id?: string
          insight_date?: string
          insight_text?: string
          support_sugg?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_insights_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_insights_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      families: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          owner_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_user_id?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          created_at: string
          family_id: string
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["family_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          child_age_group: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_login: string | null
          plan: string
          subscription_status: string
          trial_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          child_age_group?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          plan?: string
          subscription_status?: string
          trial_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          child_age_group?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          plan?: string
          subscription_status?: string
          trial_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      signal_entries: {
        Row: {
          child_id: string
          created_at: string
          description: string
          family_id: string | null
          id: string
          signal_type: string
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          description: string
          family_id?: string | null
          id?: string
          signal_type: string
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          description?: string
          family_id?: string | null
          id?: string
          signal_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signal_entries_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signal_entries_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_logs: {
        Row: {
          child_id: string
          created_at: string
          duration_minutes: number | null
          family_id: string | null
          id: string
          log_date: string
          sleep_quality: string | null
          time_ended: string | null
          time_started: string | null
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          duration_minutes?: number | null
          family_id?: string | null
          id?: string
          log_date?: string
          sleep_quality?: string | null
          time_ended?: string | null
          time_started?: string | null
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          duration_minutes?: number | null
          family_id?: string | null
          id?: string
          log_date?: string
          sleep_quality?: string | null
          time_ended?: string | null
          time_started?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleep_logs_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          billing_cycle: string | null
          cancelled_at: string | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          entitlement_status: string
          export_days_limit: number
          id: string
          payment_provider: string | null
          plan: string
          platform: string
          price: number | null
          renewal_date: string | null
          started_at: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_active: boolean | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_cycle?: string | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          entitlement_status?: string
          export_days_limit?: number
          id?: string
          payment_provider?: string | null
          plan?: string
          platform?: string
          price?: number | null
          renewal_date?: string | null
          started_at?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_active?: boolean | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_cycle?: string | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          entitlement_status?: string
          export_days_limit?: number
          id?: string
          payment_provider?: string | null
          plan?: string
          platform?: string
          price?: number | null
          renewal_date?: string | null
          started_at?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_active?: boolean | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wake_windows: {
        Row: {
          activity: string | null
          child_id: string
          created_at: string
          duration_minutes: number | null
          family_id: string | null
          id: string
          log_date: string
          time_ended: string | null
          time_started: string | null
          user_id: string
        }
        Insert: {
          activity?: string | null
          child_id: string
          created_at?: string
          duration_minutes?: number | null
          family_id?: string | null
          id?: string
          log_date?: string
          time_ended?: string | null
          time_started?: string | null
          user_id: string
        }
        Update: {
          activity?: string | null
          child_id?: string
          created_at?: string
          duration_minutes?: number | null
          family_id?: string | null
          id?: string
          log_date?: string
          time_ended?: string | null
          time_started?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wake_windows_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wake_windows_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_onboarding: {
        Args: { _child_age_months: number; _user_id: string }
        Returns: Json
      }
      get_admin_metrics: { Args: never; Returns: Json }
      get_admin_subscriptions: { Args: never; Returns: Json }
      get_admin_users: { Args: never; Returns: Json }
      has_child_role: {
        Args: {
          _child_id: string
          _role: Database["public"]["Enums"]["caregiver_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_family_role: {
        Args: {
          _family_id: string
          _role: Database["public"]["Enums"]["family_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_child_caregiver: {
        Args: { _child_id: string; _user_id: string }
        Returns: boolean
      }
      is_family_admin: {
        Args: { _family_id: string; _user_id: string }
        Returns: boolean
      }
      is_family_member: {
        Args: { _family_id: string; _user_id: string }
        Returns: boolean
      }
      is_family_owner: {
        Args: { _family_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      caregiver_role: "admin" | "caregiver"
      family_role: "owner" | "caregiver" | "viewer"
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
      app_role: ["admin", "user"],
      caregiver_role: ["admin", "caregiver"],
      family_role: ["owner", "caregiver", "viewer"],
    },
  },
} as const

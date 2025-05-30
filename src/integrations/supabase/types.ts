export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_data: Json | null
          achievement_type: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_data?: Json | null
          achievement_type: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_data?: Json | null
          achievement_type?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      assessment_sessions: {
        Row: {
          completed_at: string | null
          correct_answers: number | null
          created_at: string
          difficulty_level: number | null
          id: string
          score_percentage: number | null
          time_spent_seconds: number | null
          topic_id: string | null
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          score_percentage?: number | null
          time_spent_seconds?: number | null
          topic_id?: string | null
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          score_percentage?: number | null
          time_spent_seconds?: number | null
          topic_id?: string | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      question_responses: {
        Row: {
          correct_answer: string
          created_at: string
          explanation: string | null
          id: string
          is_correct: boolean
          question_text: string
          session_id: string
          time_spent_seconds: number | null
          user_answer: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string
          explanation?: string | null
          id?: string
          is_correct?: boolean
          question_text: string
          session_id: string
          time_spent_seconds?: number | null
          user_answer?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string
          explanation?: string | null
          id?: string
          is_correct?: boolean
          question_text?: string
          session_id?: string
          time_spent_seconds?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty_level: number | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string
          id: string
          last_practiced_at: string | null
          mastery_level: number | null
          questions_attempted: number | null
          questions_correct: number | null
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          mastery_level?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          mastery_level?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string
          daily_goal: number | null
          difficulty_preference: number | null
          id: string
          notifications_enabled: boolean | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_goal?: number | null
          difficulty_preference?: number | null
          id?: string
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_goal?: number | null
          difficulty_preference?: number | null
          id?: string
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

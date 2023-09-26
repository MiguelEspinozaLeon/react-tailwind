export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          firstname: string | null
          id: number
          lastname: string | null
          password: string | null
          username: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
          password?: string | null
          username?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
          password?: string | null
          username?: string | null
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
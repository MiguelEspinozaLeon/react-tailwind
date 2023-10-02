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
          age: number
          created_at: string
          email: string
          firstname: string
          id: number
          lastname: string
          password: string
          username: string
        }
        Insert: {
          age: number
          created_at?: string
          email: string
          firstname: string
          id?: number
          lastname: string
          password: string
          username: string
        }
        Update: {
          age?: number
          created_at?: string
          email?: string
          firstname?: string
          id?: number
          lastname?: string
          password?: string
          username?: string
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
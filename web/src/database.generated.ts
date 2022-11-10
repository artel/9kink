export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: number
          user_id: string
          username: string
          avatarFile: string | null
          bio: string | null
        }
        Insert: {
          id?: number
          user_id: string
          username: string
          avatarFile?: string | null
          bio?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          username?: string
          avatarFile?: string | null
          bio?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      citext:
        | {
            Args: { "": string }
            Returns: unknown
          }
        | {
            Args: { "": boolean }
            Returns: unknown
          }
        | {
            Args: { "": unknown }
            Returns: unknown
          }
      citext_hash: {
        Args: { "": unknown }
        Returns: number
      }
      citextin: {
        Args: { "": unknown }
        Returns: unknown
      }
      citextout: {
        Args: { "": unknown }
        Returns: unknown
      }
      citextrecv: {
        Args: { "": unknown }
        Returns: unknown
      }
      citextsend: {
        Args: { "": unknown }
        Returns: string
      }
      verify_password: {
        Args: { password: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

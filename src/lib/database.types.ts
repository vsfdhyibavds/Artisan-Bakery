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
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          special_price: number | null
          category: string
          image_url: string
          ingredients: string[]
          allergens: string[]
          is_special: boolean
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          special_price?: number | null
          category: string
          image_url: string
          ingredients?: string[]
          allergens?: string[]
          is_special?: boolean
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          special_price?: number | null
          category?: string
          image_url?: string
          ingredients?: string[]
          allergens?: string[]
          is_special?: boolean
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string | null
          city: string | null
          zip_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address?: string | null
          city?: string | null
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string | null
          city?: string | null
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string | null
          order_type: string
          status: string
          pickup_date: string
          pickup_time: string
          special_instructions: string | null
          subtotal: number
          tax: number
          delivery_fee: number
          total: number
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          order_type: string
          status?: string
          pickup_date: string
          pickup_time: string
          special_instructions?: string | null
          subtotal: number
          tax: number
          delivery_fee?: number
          total: number
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          order_type?: string
          status?: string
          pickup_date?: string
          pickup_time?: string
          special_instructions?: string | null
          subtotal?: number
          tax?: number
          delivery_fee?: number
          total?: number
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number
          unit_price: number
          total_price: number
          customizations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity: number
          unit_price: number
          total_price: number
          customizations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          customizations?: Json | null
          created_at?: string
        }
      }
      custom_cakes: {
        Row: {
          id: string
          order_item_id: string | null
          size: string
          flavor: string
          frosting: string
          decorations: string[]
          custom_message: string | null
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_item_id?: string | null
          size: string
          flavor: string
          frosting: string
          decorations?: string[]
          custom_message?: string | null
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_item_id?: string | null
          size?: string
          flavor?: string
          frosting?: string
          decorations?: string[]
          custom_message?: string | null
          total_price?: number
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          customer_id: string | null
          name: string
          content: string
          rating: number
          image_url: string | null
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          name: string
          content: string
          rating: number
          image_url?: string | null
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          name?: string
          content?: string
          rating?: number
          image_url?: string | null
          is_approved?: boolean
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          event_time: string
          duration: string
          location: string
          price: number
          max_participants: number
          current_participants: number
          instructor: string
          difficulty: string
          category: string
          image_url: string
          includes: string[]
          requirements: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          event_time: string
          duration: string
          location: string
          price: number
          max_participants: number
          current_participants?: number
          instructor: string
          difficulty: string
          category: string
          image_url: string
          includes?: string[]
          requirements?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          event_time?: string
          duration?: string
          location?: string
          price?: number
          max_participants?: number
          current_participants?: number
          instructor?: string
          difficulty?: string
          category?: string
          image_url?: string
          includes?: string[]
          requirements?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string | null
          customer_id: string | null
          registration_date: string
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          customer_id?: string | null
          registration_date?: string
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          customer_id?: string | null
          registration_date?: string
          payment_status?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          author: string
          category: string
          tags: string[]
          image_url: string
          read_time: string
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          author: string
          category: string
          tags?: string[]
          image_url: string
          read_time: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          author?: string
          category?: string
          tags?: string[]
          image_url?: string
          read_time?: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          id?: string
          email: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_active?: boolean
          subscribed_at?: string
        }
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
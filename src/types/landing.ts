export interface HeroBanner {
    id: number;
    image_url: string;
    title: string;
    subtitle?: string;
    headtext?: string;
    text_color: string;
    cta_button_color: string;
    cta_button_text_color: string;
    cta_button_text?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

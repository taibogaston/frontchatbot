import {
  LoginResponse,
  RegisterResponse,
  VerifyEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ResendVerificationResponse,
  GetCurrentUserResponse,
  UpdateUserPreferencesResponse,
  CompleteOnboardingResponse,
  GetOnboardingStatusResponse,
  GetChatsResponse,
  GetChatResponse,
  CreateChatResponse,
  DeactivateChatResponse,
  GetMessagesResponse,
  SendMessageResponse,
  TestNewCharacterResponse,
  Chat
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Error de conexión' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(nombre: string, email: string, password: string): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password }),
    });
  }

  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    return this.request<VerifyEmailResponse>(`/auth/verify/${token}`);
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    return this.request<ResetPasswordResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  async resendVerification(email: string): Promise<ResendVerificationResponse> {
    return this.request<ResendVerificationResponse>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // User endpoints
  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    return this.request<GetCurrentUserResponse>('/users/me');
  }

  async updateUserPreferences(preferences: any): Promise<UpdateUserPreferencesResponse> {
    return this.request<UpdateUserPreferencesResponse>('/users/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  }

  // Onboarding endpoints
  async completeOnboarding(data: any): Promise<CompleteOnboardingResponse> {
    return this.request<CompleteOnboardingResponse>('/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOnboardingStatus(): Promise<GetOnboardingStatusResponse> {
    return this.request<GetOnboardingStatusResponse>('/onboarding/status');
  }

  // Chat endpoints
  async getChats(): Promise<GetChatsResponse> {
    return this.request<GetChatsResponse>('/chats');
  }

  async getChat(chatId: string): Promise<GetChatResponse> {
    return this.request<GetChatResponse>(`/chats/${chatId}`);
  }

  async createChat(partner: any): Promise<CreateChatResponse> {
    return this.request<CreateChatResponse>('/chats', {
      method: 'POST',
      body: JSON.stringify({ partner }),
    });
  }

  async deactivateChat(chatId: string): Promise<DeactivateChatResponse> {
    return this.request<DeactivateChatResponse>(`/chats/${chatId}/deactivate`, {
      method: 'PATCH',
    });
  }

  // Message endpoints
  async getMessages(chatId: string): Promise<GetMessagesResponse> {
    return this.request<GetMessagesResponse>(`/messages/${chatId}`);
  }

  async sendMessage(chatId: string, sender: string, content: string): Promise<SendMessageResponse> {
    return this.request<SendMessageResponse>(`/messages/${chatId}`, {
      method: 'POST',
      body: JSON.stringify({ sender, content }),
    });
  }

  async testNewCharacter(chatId: string): Promise<TestNewCharacterResponse> {
    return this.request<TestNewCharacterResponse>(`/messages/test-new-character/${chatId}`, {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// User types
export interface User {
  id: string;
  nombre: string;
  email: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth response types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ResendVerificationResponse {
  message: string;
}

// User response types
export interface GetCurrentUserResponse {
  user: User;
}

export interface UpdateUserPreferencesResponse {
  message: string;
}

// Onboarding response types
export interface CompleteOnboardingResponse {
  message: string;
}

export interface GetOnboardingStatusResponse {
  completed: boolean;
}

// Chat types
export interface Chat {
  id: string;
  partner: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetChatsResponse {
  chats: Chat[];
}

export interface GetChatResponse {
  chat: Chat;
}

export interface CreateChatResponse {
  chat: Chat;
}

export interface DeactivateChatResponse {
  message: string;
}

// Message types
export interface Message {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  createdAt: string;
}

export interface GetMessagesResponse {
  messages: Message[];
}

export interface SendMessageResponse {
  message: Message;
}

export interface TestNewCharacterResponse {
  message: string;
}

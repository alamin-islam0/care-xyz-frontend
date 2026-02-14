// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Service Types
export interface Service {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  chargePerHour: number;
  chargePerDay: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  services: Service[];
}

// Location Type
export interface BookingLocation {
  division: string;
  district: string;
  city: string;
  area: string;
  address: string;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type BookingDuration = 'hourly' | 'daily';

export interface Booking {
  _id: string;
  user: User | string;
  service: Service | string;
  duration: BookingDuration; // Wait, previous code used durationValue
  durationType: 'hours' | 'days'; // Wait, previous code used durationType and durationValue
  durationValue: number;
  location: BookingLocation;
  startDate: string;
  endDate?: string;
  totalCost: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  booking: Booking;
}

export interface BookingsResponse {
  bookings: Booking[];
}

// API Error
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface BookingFormData {
  durationType: 'hours' | 'days';
  durationValue: number;
  location: BookingLocation;
  startDate: string;
  endDate?: string;
  specialRequests?: string;
}

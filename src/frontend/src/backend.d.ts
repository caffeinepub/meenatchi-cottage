import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TimeSlot {
    startTime: Time;
    endTime: Time;
}
export type Time = bigint;
export interface AppointmentForm {
    service: Service;
    customerName: string;
    date: Time;
    phone: string;
    timeSlot: TimeSlot;
}
export interface Appointment {
    service: Service;
    customerName: string;
    status: AppointmentStatus;
    date: Time;
    phone: string;
    timeSlot: TimeSlot;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    name: string;
    comment: string;
    rating: bigint;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum Service {
    massage = "massage",
    hairStyling = "hairStyling",
    pedicure = "pedicure",
    haircut = "haircut",
    hairColoring = "hairColoring",
    waxing = "waxing",
    manicure = "manicure",
    threading = "threading",
    facial = "facial",
    bridalMakeup = "bridalMakeup"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAppointments(): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAppointment(form: AppointmentForm): Promise<void>;
    submitTestimonial(testimonial: Testimonial): Promise<void>;
    updateAppointmentStatus(customerName: string, status: AppointmentStatus): Promise<void>;
}

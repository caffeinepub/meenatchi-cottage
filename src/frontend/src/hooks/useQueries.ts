import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AppointmentForm,
  AppointmentStatus,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (form: AppointmentForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitAppointment(form);
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      status,
    }: { customerName: string; status: AppointmentStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAppointmentStatus(customerName, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useSubmitTestimonial() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitTestimonial(testimonial);
    },
  });
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAppointments,
  useIsAdmin,
  useUpdateAppointmentStatus,
} from "@/hooks/useQueries";
import { useState } from "react";
import { AppointmentStatus, Service } from "../backend.d";

const SERVICE_LABELS: Record<Service, string> = {
  [Service.bridalMakeup]: "Bridal Makeup",
  [Service.hairStyling]: "Hair Styling",
  [Service.facial]: "Facial",
  [Service.massage]: "Massage",
  [Service.pedicure]: "Pedicure",
  [Service.haircut]: "Haircut",
  [Service.hairColoring]: "Hair Coloring",
  [Service.waxing]: "Waxing",
  [Service.manicure]: "Manicure",
  [Service.threading]: "Threading",
};

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  [AppointmentStatus.pending]: "bg-yellow-100 text-yellow-800",
  [AppointmentStatus.confirmed]: "bg-blue-100 text-blue-800",
  [AppointmentStatus.completed]: "bg-green-100 text-green-800",
  [AppointmentStatus.cancelled]: "bg-red-100 text-red-800",
};

export default function Admin() {
  const { data: appointments, isLoading } = useGetAppointments();
  const { data: isAdmin } = useIsAdmin();
  const { mutate: updateStatus } = useUpdateAppointmentStatus();
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold maroon-text">
            Admin Access Required
          </h2>
          <p className="font-body text-muted-foreground mt-2">
            You need admin privileges to view this page.
          </p>
        </div>
      </div>
    );
  }

  const filtered =
    filter === "all"
      ? (appointments ?? [])
      : (appointments ?? []).filter((a) => a.status === filter);
  const counts = {
    total: appointments?.length ?? 0,
    pending:
      appointments?.filter((a) => a.status === AppointmentStatus.pending)
        .length ?? 0,
    confirmed:
      appointments?.filter((a) => a.status === AppointmentStatus.confirmed)
        .length ?? 0,
    completed:
      appointments?.filter((a) => a.status === AppointmentStatus.completed)
        .length ?? 0,
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="py-10 bg-gradient-to-br from-secondary/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold maroon-text">
            Admin Dashboard 🦚
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Manage all appointments
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: counts.total,
              color: "bg-white border-border",
            },
            {
              label: "Pending",
              value: counts.pending,
              color: "bg-yellow-50 border-yellow-200",
            },
            {
              label: "Confirmed",
              value: counts.confirmed,
              color: "bg-blue-50 border-blue-200",
            },
            {
              label: "Completed",
              value: counts.completed,
              color: "bg-green-50 border-green-200",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.color} border rounded-xl p-4 text-center`}
            >
              <div className="font-display text-3xl font-bold maroon-text">
                {s.value}
              </div>
              <div className="font-body text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {(["all", ...Object.values(AppointmentStatus)] as const).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setFilter(s)}
              className={`font-body text-sm px-3 py-1.5 rounded-full border transition-all capitalize ${
                filter === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div data-ocid="admin.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div
            data-ocid="admin.appointments.table"
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-border"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20">
                  <TableHead className="font-body font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="font-body font-semibold">
                    Phone
                  </TableHead>
                  <TableHead className="font-body font-semibold">
                    Service
                  </TableHead>
                  <TableHead className="font-body font-semibold">
                    Date
                  </TableHead>
                  <TableHead className="font-body font-semibold">
                    Time
                  </TableHead>
                  <TableHead className="font-body font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 font-body text-muted-foreground"
                      data-ocid="admin.empty_state"
                    >
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((appt, idx) => (
                    <TableRow
                      key={`${appt.customerName}-${idx}`}
                      data-ocid="admin.appointments.row"
                    >
                      <TableCell className="font-body font-medium">
                        {appt.customerName}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {appt.phone}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {SERVICE_LABELS[appt.service] ?? appt.service}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {new Date(
                          Number(appt.date) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {new Date(
                          Number(appt.timeSlot.startTime) / 1_000_000,
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={appt.status}
                          onValueChange={(v) =>
                            updateStatus({
                              customerName: appt.customerName,
                              status: v as AppointmentStatus,
                            })
                          }
                        >
                          <SelectTrigger
                            className={`font-body text-xs h-8 w-32 border-0 rounded-full ${STATUS_COLORS[appt.status]}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AppointmentStatus).map((s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="font-body text-xs capitalize"
                              >
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

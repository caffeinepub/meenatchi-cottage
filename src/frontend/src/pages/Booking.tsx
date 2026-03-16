import PeacockDivider from "@/components/PeacockDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/contexts/LanguageContext";
import { useSubmitAppointment } from "@/hooks/useQueries";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Service } from "../backend.d";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const SERVICE_OPTIONS: { value: Service; label: string }[] = [
  { value: Service.bridalMakeup, label: "Bridal Makeup" },
  { value: Service.hairStyling, label: "Hair Styling" },
  { value: Service.facial, label: "Facial" },
  { value: Service.hairColoring, label: "Hair Coloring" },
  { value: Service.waxing, label: "Waxing & Threading" },
  { value: Service.manicure, label: "Nail Art / Manicure" },
  { value: Service.pedicure, label: "Pedicure" },
  { value: Service.haircut, label: "Haircut" },
  { value: Service.massage, label: "Massage / Spa" },
  { value: Service.threading, label: "Threading" },
];

function parseTimeSlot(timeStr: string): {
  startTime: bigint;
  endTime: bigint;
} {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let h = hours;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  const baseMs = new Date().setHours(h, minutes || 0, 0, 0);
  const startTime = BigInt(baseMs) * 1000000n;
  const endTime = startTime + BigInt(3600 * 1000 * 1000000);
  return { startTime, endTime };
}

export default function Booking() {
  const { t } = useLang();
  const { mutateAsync, isPending, isSuccess } = useSubmitAppointment();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "" as Service | "",
    date: "",
    time: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.phone ||
      !form.service ||
      !form.date ||
      !form.time
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const dateNs = BigInt(new Date(form.date).getTime()) * 1000000n;
      const timeSlot = parseTimeSlot(form.time);
      await mutateAsync({
        customerName: form.name,
        phone: form.phone,
        service: form.service as Service,
        date: dateNs,
        timeSlot,
      });
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-secondary/10">
        <div
          data-ocid="booking.success_state"
          className="text-center px-6 max-w-md"
        >
          <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <h2 className="font-display text-3xl font-bold maroon-text mb-3">
            Booking Confirmed! 🎉
          </h2>
          <p className="font-body text-muted-foreground">
            We'll call you within 2 hours to confirm your appointment. See you
            soon! 🦚
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <Button className="bg-green-600 text-white hover:bg-green-700 gap-2">
              <MessageCircle size={16} /> Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-br from-secondary/30 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
            🦚 Reserve Your Slot 🪷
          </p>
          <h1 className="section-title mb-4">{t("section.book_now")}</h1>
          <PeacockDivider />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Appointment Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm font-medium mb-1.5 block">
                        Full Name *
                      </Label>
                      <Input
                        data-ocid="booking.form.input"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        className="font-body"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-sm font-medium mb-1.5 block">
                        Phone / WhatsApp *
                      </Label>
                      <Input
                        data-ocid="booking.form.input"
                        placeholder="+91-XXXXX-XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        required
                        type="tel"
                        className="font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-body text-sm font-medium mb-1.5 block">
                      Service *
                    </Label>
                    <Select
                      value={form.service}
                      onValueChange={(v) =>
                        setForm({ ...form, service: v as Service })
                      }
                    >
                      <SelectTrigger
                        data-ocid="booking.form.input"
                        className="font-body"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="font-body"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm font-medium mb-1.5 block">
                        Preferred Date *
                      </Label>
                      <Input
                        data-ocid="booking.form.input"
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="font-body"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-sm font-medium mb-1.5 block">
                        Preferred Time *
                      </Label>
                      <Select
                        value={form.time}
                        onValueChange={(v) => setForm({ ...form, time: v })}
                      >
                        <SelectTrigger
                          data-ocid="booking.form.input"
                          className="font-body"
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t} className="font-body">
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="font-body text-sm font-medium mb-1.5 block">
                      Additional Notes
                    </Label>
                    <Textarea
                      data-ocid="booking.form.input"
                      placeholder="Any special requests or requirements..."
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      rows={3}
                      className="font-body"
                    />
                  </div>

                  {error && (
                    <p
                      data-ocid="booking.error_state"
                      className="font-body text-sm text-destructive"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    data-ocid="booking.form.submit_button"
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 py-3 text-base font-body"
                  >
                    {isPending ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                <h3 className="font-display text-lg font-semibold mb-4">
                  Contact Us
                </h3>
                <ul className="space-y-3 font-body text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span className="opacity-90">
                      123 Main Street, Rānipet, Tamil Nadu 632401
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-accent" />
                    <a
                      href="tel:+919876543210"
                      className="opacity-90 hover:opacity-100"
                    >
                      +91-98765-43210
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="shrink-0 text-accent" />
                    <a
                      href="mailto:hello@alagumail.in"
                      className="opacity-90 hover:opacity-100"
                    >
                      hello@alagumail.in
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={16} className="shrink-0 text-accent" />
                    <span className="opacity-90">Mon–Sun: 9 AM – 9 PM</span>
                  </li>
                </ul>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 font-body text-sm font-medium transition-colors"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>

              {/* Hours table */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-display text-base font-semibold maroon-text mb-3">
                  Working Hours
                </h3>
                <div className="space-y-2 font-body text-sm">
                  {[["Monday – Sunday", "9:00 AM – 9:00 PM"]].map(
                    ([day, hrs]) => (
                      <div
                        key={day}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>{day}</span>
                        <span className="font-medium text-foreground">
                          {hrs}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 bg-secondary/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9!2d79.3!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3OcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Salon location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

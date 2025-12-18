import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Trash2, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  store: string;
  productName?: string;
  createdAt: string;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      return JSON.parse(saved);
    }
    // Mock data - pre-populate with sample appointments
    return [
      {
        id: "1",
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        email: "priya.sharma@email.com",
        date: "2024-12-20",
        time: "10:30 AM",
        store: "Zaveri Bazaar, Mumbai",
        productName: "Royal Diamond Necklace",
        createdAt: "2024-12-15"
      },
      {
        id: "2",
        name: "Amit Patel",
        phone: "+91 98765 43211",
        email: "amit.patel@email.com",
        date: "2024-12-18",
        time: "2:00 PM",
        store: "Bandra West, Mumbai",
        productName: "Gold Wedding Ring",
        createdAt: "2024-12-10"
      },
      {
        id: "3",
        name: "Kavita Reddy",
        phone: "+91 98765 43212",
        email: "kavita.reddy@email.com",
        date: "2024-12-25",
        time: "11:00 AM",
        store: "Zaveri Bazaar, Mumbai",
        productName: "Pearl Earrings Set",
        createdAt: "2024-12-12"
      }
    ];
  });
  const { toast } = useToast();

  const cancelAppointment = (id: string) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully",
    });
  };

  const getStatusBadge = (date: string) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return <Badge variant="secondary">Completed</Badge>;
    } else if (appointmentDate.getTime() === today.getTime()) {
      return <Badge className="bg-green-500 hover:bg-green-600">Today</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-foreground mb-2">My Appointments</h1>
        <p className="text-muted-foreground">
          Manage your store visit appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No appointments scheduled
            </h3>
            <p className="text-muted-foreground mb-6">
              Book an appointment from any product page to try on jewelry at our store
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Appointment Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(appointment.date)}
                        {appointment.productName && (
                          <span className="text-sm text-muted-foreground">
                            For: {appointment.productName}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-foreground">
                            {new Date(appointment.date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{appointment.store}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{appointment.name}</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {appointment.phone}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => cancelAppointment(appointment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Trash2, Edit, X, Search, Filter, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      },
      {
        id: "4",
        name: "Rahul Singh",
        phone: "+91 98765 43213",
        email: "rahul.singh@email.com",
        date: "2024-11-15",
        time: "3:30 PM",
        store: "Bandra West, Mumbai",
        productName: "Silver Bracelet",
        createdAt: "2024-11-10"
      },
      {
        id: "5",
        name: "Neha Gupta",
        phone: "+91 98765 43214",
        email: "neha.gupta@email.com",
        date: "2024-10-20",
        time: "1:00 PM",
        store: "Zaveri Bazaar, Mumbai",
        productName: "Diamond Earrings",
        createdAt: "2024-10-15"
      }
    ];
  });
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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
      return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
    } else if (appointmentDate.getTime() === today.getTime()) {
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">Today</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
    }
  };

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let filtered = appointments.filter(apt => {
      const appointmentDate = new Date(apt.date);
      const matchesSearch = apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           apt.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (apt.productName && apt.productName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      if (activeTab === "upcoming") {
        return appointmentDate >= today;
      } else if (activeTab === "history") {
        return appointmentDate < today;
      }
      return true;
    });
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const AppointmentList = ({ appointments, onEdit, onView, onCancel }: {
    appointments: Appointment[];
    onEdit: (apt: Appointment) => void;
    onView: (apt: Appointment) => void;
    onCancel: (id: string) => void;
  }) => {
    if (appointments.length === 0) {
      return (
        <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No appointments found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "No appointments in this category"}
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
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
                      className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2"
                      onClick={() => onView(appointment)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2"
                      onClick={() => onEdit(appointment)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2 text-destructive hover:text-destructive"
                      onClick={() => onCancel(appointment.id)}
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
    );
  };

  const AppointmentDetailModal = ({ appointment, onClose, onEdit, onCancel }: {
    appointment: Appointment;
    onClose: () => void;
    onEdit: () => void;
    onCancel: () => void;
  }) => {
    return (
      <>
        <div className="sticky top-0 bg-gradient-mgm text-primary-foreground p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="font-display text-2xl font-bold">Appointment Details</h2>
            <p className="text-primary-foreground/90 text-sm">
              {new Date(appointment.date).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })} at {appointment.time}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-3">
              {getStatusBadge(appointment.date)}
              <div>
                <p className="font-semibold text-lg">
                  {new Date(appointment.date) >= new Date() ? "Upcoming Appointment" : "Completed Appointment"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(appointment.date).getTime() === new Date().getTime() ? "Today's appointment" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="font-semibold">{appointment.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-semibold">{appointment.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-semibold">{appointment.email}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-semibold">
                  {new Date(appointment.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p className="font-semibold">{appointment.time}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Store Location</p>
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {appointment.store}
                </p>
              </div>
              {appointment.productName && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Product of Interest</p>
                  <p className="font-semibold">{appointment.productName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={onEdit}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Appointment
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={onClose}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm
            </Button>
            <Button
              variant="destructive"
              className="flex-1 transition-all duration-300 hover:scale-105"
              onClick={onCancel}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Cancel Appointment
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-2xl p-6 text-primary-foreground shadow-xl">
        <h1 className="font-display text-3xl font-bold mb-2">My Appointments</h1>
        <p className="text-primary-foreground/90">
          Manage your store visit appointments
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted">
          <TabsTrigger value="all" className="data-[state=active]:bg-background">
            All <Badge className="ml-1 bg-primary">{appointments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
            Upcoming <Badge className="ml-1 bg-primary">{getFilteredAppointments().filter(apt => new Date(apt.date) >= new Date()).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-background">
            History <Badge className="ml-1 bg-primary">{getFilteredAppointments().filter(apt => new Date(apt.date) < new Date()).length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <AppointmentList 
            appointments={getFilteredAppointments()} 
            onEdit={setSelectedAppointment}
            onView={setSelectedAppointment}
            onCancel={cancelAppointment}
          />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          <AppointmentList 
            appointments={getFilteredAppointments().filter(apt => new Date(apt.date) >= new Date())} 
            onEdit={setSelectedAppointment}
            onView={setSelectedAppointment}
            onCancel={cancelAppointment}
          />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <AppointmentList 
            appointments={getFilteredAppointments().filter(apt => new Date(apt.date) < new Date())} 
            onEdit={setSelectedAppointment}
            onView={setSelectedAppointment}
            onCancel={cancelAppointment}
          />
        </TabsContent>
      </Tabs>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAppointment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-11/12 max-h-[85vh] overflow-y-auto shadow-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AppointmentDetailModal 
                appointment={selectedAppointment} 
                onClose={() => setSelectedAppointment(null)}
                onEdit={() => {
                  setSelectedAppointment(null);
                  // Edit functionality here
                }}
                onCancel={() => {
                  setSelectedAppointment(null);
                  cancelAppointment(selectedAppointment.id);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyAppointments;

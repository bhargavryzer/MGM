import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save, Camera, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

const ProfileSettings = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Priya Sharma",
          email: "priya.sharma@email.com",
          phone: "+91 98765 43210",
          address: "123 Jewelers Lane, Zaveri Bazaar, Mumbai - 400002, Maharashtra, India",
          avatar: "",
        };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState<string>("");
  const { toast } = useToast();

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedAvatar(e.target.result as string);
        setShowAvatarDialog(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmAvatarChange = () => {
    handleChange("avatar", selectedAvatar);
    setShowAvatarDialog(false);
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated successfully",
    });
  };

  const handlePreferenceClick = (preference: string) => {
    setSelectedPreference(preference);
    setShowPreferencesDialog(true);
  };

  const confirmPreferenceChange = () => {
    // Handle preference change logic here
    toast({
      title: "Preference Updated",
      description: `${selectedPreference} preference has been updated`,
    });
    setShowPreferencesDialog(false);
    setSelectedPreference("");
  };

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      setIsLoading(false);
      setShowSaveDialog(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully",
      });
    }, 500);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-xl p-4 text-primary-foreground shadow-lg">
        <h1 className="font-display text-2xl font-bold mb-1">Profile Settings</h1>
        <p className="text-primary-foreground/90 text-sm">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="border-border/50 lg:col-span-1 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-3">
                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-primary" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-all duration-300 hover:scale-110">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h3 className="font-semibold text-foreground">
                {profile.name || "Your Name"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile.email || "your@email.com"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="border-border/50 lg:col-span-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Enter your address"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="pl-10 min-h-[100px]"
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={isLoading} className="gap-2 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => handlePreferenceClick("Notifications")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Receive updates about your orders and offers
              </p>
            </button>
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => handlePreferenceClick("Newsletter")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Newsletter</h4>
              <p className="text-xs text-muted-foreground">
                Get latest collections and exclusive deals
              </p>
            </button>
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => handlePreferenceClick("Language")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Language</h4>
              <p className="text-xs text-muted-foreground">
                English (India)
              </p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Save Confirmation Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Save Profile Changes</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to save the changes to your profile?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSave}
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Avatar Confirmation Dialog */}
      {showAvatarDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Update Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to update your profile picture?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedAvatar}
                  alt="New avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">New profile picture preview</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAvatarDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmAvatarChange}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  Update Picture
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Preferences Confirmation Dialog */}
      {showPreferencesDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Update Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to update your {selectedPreference} preference?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferencesDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmPreferenceChange}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  Update Preference
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;

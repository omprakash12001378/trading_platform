import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import {
  VerifiedIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  KeyIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  LockIcon,
  UserCircle2Icon
} from "lucide-react";
import { enableTwoStepAuthentication, sendResetPassowrdOTP, verifyOtp } from "@/Redux/Auth/Action";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp);
    dispatch(
      enableTwoStepAuthentication({
        jwt: localStorage.getItem("jwt"),
        otp,
      })
    );
    setIs2FAOpen(false);
  };

  const handleVerifyOtp = (otp) => {
    console.log("otp  - ", otp);
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
    setIsVerifyOpen(false);
  };

  const navigate = useNavigate();

  const handleChangePassword = () => {
    dispatch(sendResetPassowrdOTP({
      sendTo: auth.user?.email,
      verificationType: "EMAIL",
      navigate
    }))
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div className="px-6 lg:px-12 py-8 mt-6 fade-in min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Profile Settings</span>
        </h1>
        <p className="text-gray-400">Manage your account settings and security preferences</p>
      </div>

      {/* Profile Header Card */}
      <div className="glass-effect rounded-2xl p-8 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-emerald-500/20">
            <AvatarImage src={auth.user?.picture} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
              {getInitials(auth.user?.fullName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="text-3xl font-bold">{auth.user?.fullName}</h2>
              {auth.user?.verified && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2Icon className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-gray-400 mb-4">{auth.user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="border-emerald-500/30">
                <UserIcon className="h-3 w-3 mr-1" />
                Member since {new Date(auth.user?.createdAt || Date.now()).getFullYear()}
              </Badge>
              {auth.user?.twoFactorAuth?.enabled && (
                <Badge variant="outline" className="border-emerald-500/30">
                  <ShieldCheckIcon className="h-3 w-3 mr-1" />
                  2FA Enabled
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <UserCircle2Icon className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <MailIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-semibold">{auth.user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <UserIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="font-semibold">{auth.user?.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <PhoneIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Mobile Number</p>
                <p className="font-semibold">{auth.user?.mobile || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="glass-effect rounded-2xl p-6 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheckIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Account Security</h3>
          </div>

          <div className="space-y-4">
            {/* Account Status */}
            <div className="p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <VerifiedIcon className="h-5 w-5 text-emerald-500" />
                  <span className="font-semibold">Account Status</span>
                </div>
                {auth.user?.verified ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    <AlertCircleIcon className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
              {!auth.user?.verified && (
                <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Verify Account Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
                    <DialogHeader>
                      <DialogTitle className="text-center">Verify Your Account</DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleVerifyOtp} />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* 2FA Status */}
            <div className="p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
                  <span className="font-semibold">Two-Factor Authentication</span>
                </div>
                {auth.user?.twoFactorAuth?.enabled ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    <AlertCircleIcon className="h-3 w-3 mr-1" />
                    Disabled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Add an extra layer of security to your account
              </p>
              {!auth.user?.twoFactorAuth?.enabled && (
                <Dialog open={is2FAOpen} onOpenChange={setIs2FAOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Enable 2FA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card/95 backdrop-blur-md border-emerald-500/20">
                    <DialogHeader>
                      <DialogTitle className="text-center">Enable Two-Factor Authentication</DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Password */}
            <div className="p-4 rounded-xl bg-card/50 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <LockIcon className="h-5 w-5 text-emerald-500" />
                  <span className="font-semibold">Password</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Last changed: Never
              </p>
              <Button
                variant="outline"
                className="w-full border-emerald-500/30 hover:bg-emerald-500/10"
                onClick={handleChangePassword}
              >
                <KeyIcon className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="mt-6 glass-effect rounded-xl p-6 border border-blue-500/10 bg-blue-500/5">
        <div className="flex gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 h-fit">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400 mb-2">Security Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Enable two-factor authentication for enhanced security</li>
              <li>• Use a strong, unique password for your account</li>
              <li>• Never share your password or 2FA codes with anyone</li>
              <li>• Verify your account to unlock all platform features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

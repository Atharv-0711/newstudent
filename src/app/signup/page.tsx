import SignupForm from "@/components/auth/SignupForm";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Student Survey Analysis</h1>
            <ThemeSwitcher />
          </div>
          <SignupForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex md:flex-1 bg-primary/5 relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center">
          <div className="relative w-full h-64 mb-8">
            <Image
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
              alt="Teacher with students"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Join Our Platform</h2>
          <p className="text-muted-foreground">
            Create an account to access powerful tools for analyzing student
            surveys and improving educational outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

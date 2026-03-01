"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Progress } from "@/components/ui/progress"

import {
  Users,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)
  const [loginType, setLoginType] =
    useState<"email" | "phone">("email")

  const [showOTPDialog, setShowOTPDialog] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [resendTimer, setResendTimer] = useState(30)

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<
    Record<string, string>
  >({})

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/) && password.match(/[A-Z]/))
      strength += 25
    if (password.match(/[0-9]/)) strength += 25
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25
    return strength
  }

  const passwordStrength = calculatePasswordStrength(
    formData.password
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.identifier) {
      newErrors.identifier =
        loginType === "email"
          ? "Email is required"
          : "Phone number is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setShowOTPDialog(true)

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleVerifyOTP = () => {
    if (otpValue.length === 6) {
      setShowOTPDialog(false)
      router.push("/dashboard")
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-xl border-border">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">
              Create Account
            </CardTitle>
            <CardDescription>
              Register for Community Portal access
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Toggle */}
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <button
                  type="button"
                  onClick={() => setLoginType("email")}
                  className={`flex-1 px-3 py-2 rounded-md ${
                    loginType === "email"
                      ? "bg-white shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Email
                </button>

                <button
                  type="button"
                  onClick={() => setLoginType("phone")}
                  className={`flex-1 px-3 py-2 rounded-md ${
                    loginType === "phone"
                      ? "bg-white shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Identifier */}
              <div className="space-y-2">
                <Label>
                  {loginType === "email"
                    ? "Email Address"
                    : "Phone Number"}
                </Label>

                <Input
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identifier: e.target.value,
                    })
                  }
                />

                {errors.identifier && (
                  <p className="text-xs text-destructive">
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>

                <Input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />

                {formData.password && (
                  <Progress
                    value={passwordStrength}
                  />
                )}
              </div>

              {/* Confirm */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <Input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* OTP Dialog */}
      <Dialog
        open={showOTPDialog}
        onOpenChange={setShowOTPDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Verify OTP
            </DialogTitle>
            <DialogDescription>
              Enter 6-digit code sent to{" "}
              {formData.identifier}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) =>
                  setOtpValue(value)
                }
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map(
                    (i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                      />
                    )
                  )}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otpValue.length !== 6}
              className="w-full"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verify & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
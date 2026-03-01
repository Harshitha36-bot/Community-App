"use client"

import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Users,
  MapPin,
  GraduationCap,
  Wallet,
  FileText,
  Clock,
  CheckCircle2,
  Edit,
  ArrowRight,
  AlertCircle,
} from "lucide-react"

const profileSections = [
  { name: "Personal Details", icon: User, completed: true, href: "/dashboard/profile/personal" },
  { name: "Religious Details", icon: FileText, completed: true, href: "/dashboard/profile/religious" },
  { name: "Family Information", icon: Users, completed: false, href: "/dashboard/profile/family" },
  { name: "Location Information", icon: MapPin, completed: false, href: "/dashboard/profile/location" },
  { name: "Education & Profession", icon: GraduationCap, completed: false, href: "/dashboard/profile/education" },
  { name: "Economic Details", icon: Wallet, completed: false, href: "/dashboard/profile/economic" },
  { name: "Review & Submit", icon: CheckCircle2, completed: false, href: "/dashboard/profile/review" },
]

type ProfileStatus = "draft" | "pending" | "approved" | "rejected"

export default function DashboardPage() {
  const router = useRouter()

  const profileStatus: ProfileStatus = "draft"

  const completedSections = profileSections.filter(s => s.completed).length
  const totalSections = profileSections.length
  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100
  )

  const getStatusConfig = (status: ProfileStatus) => {
    switch (status) {
      case "draft":
        return {
          badge: (
            <Badge className="bg-orange-100 text-orange-700 border-orange-300">
              Draft
            </Badge>
          ),
          message:
            "Your profile is incomplete. Continue filling out your information.",
          icon: <Edit className="h-5 w-5 text-orange-600" />,
        }

      case "pending":
        return {
          badge: (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Pending
            </Badge>
          ),
          message: "Your profile is under review.",
          icon: <Clock className="h-5 w-5 text-yellow-600" />,
        }

      case "approved":
        return {
          badge: (
            <Badge className="bg-green-100 text-green-800 border-green-300">
              Approved
            </Badge>
          ),
          message: "Your profile has been approved.",
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        }

      case "rejected":
        return {
          badge: <Badge variant="destructive">Rejected</Badge>,
          message: "Please review and correct your profile.",
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
        }
    }
  }

  const statusConfig = getStatusConfig(profileStatus)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome to Your Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your community profile and track your registration status
        </p>
      </div>

      {/* Status Card */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {statusConfig.icon}
                Current Status
              </CardTitle>
              <CardDescription>
                {statusConfig.message}
              </CardDescription>
            </div>
            {statusConfig.badge}
          </div>
        </CardHeader>
      </Card>

      {/* Completion */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>
                Complete all sections to submit
              </CardDescription>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {completionPercentage}%
              </div>
              <div className="text-xs text-muted-foreground">
                {completedSections} of {totalSections}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Progress value={completionPercentage} />

          <div className="grid gap-3">
            {profileSections.map((section) => (
              <div
                key={section.name}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/40 transition"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {section.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.completed
                        ? "Completed"
                        : "Not started"}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(section.href)}
                >
                  {section.completed ? "Edit" : "Start"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
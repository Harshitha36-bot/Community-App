"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Save, Plus, Trash2 } from "lucide-react"

const educationLevels = [
  "Primary School",
  "High School",
  "Higher Secondary",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Degree",
]

const professionTypes = [
  "Engineering",
  "Medical",
  "Teaching",
  "Business",
  "Agriculture",
  "Government Service",
  "IT/Software",
  "Banking/Finance",
  "Legal",
  "Arts/Media",
  "Other",
]

const employmentTypes = [
  "Private Sector",
  "Government",
  "Business Owner",
  "Freelancer",
  "Farmer",
  "Self-Employed",
  "Unemployed",
  "Retired",
  "Student",
  "Other",
]

const languages = [
  "Hindi",
  "Marathi",
  "English",
  "Sanskrit",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Bengali",
  "Malayalam",
]

export default function EducationPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    highestEducation: "",
    professionType: "",
    industry: "",
    employmentType: "",
  })

  const [certifications, setCertifications] = useState<string[]>([""])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addCertification = () => {
    setCertifications([...certifications, ""])
  }

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index))
    }
  }

  const updateCertification = (index: number, value: string) => {
    const updated = [...certifications]
    updated[index] = value
    setCertifications(updated)
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.highestEducation)
      newErrors.highestEducation = "Select highest education"

    if (!formData.professionType)
      newErrors.professionType = "Select profession type"

    if (!formData.employmentType)
      newErrors.employmentType = "Select employment type"

    if (selectedLanguages.length === 0)
      newErrors.languages = "Select at least one language"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/dashboard/profile/economic")
    }
  }

  const handleBack = () => {
    router.push("/dashboard/profile/location")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/profile")}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>

        <h1 className="text-3xl font-semibold">
          Education & Profession
        </h1>

        <p className="text-muted-foreground mt-1">
          Step 5 of 7
        </p>
      </div>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Educational Qualifications</CardTitle>
          <CardDescription>
            Academic background
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>Highest Education</Label>
            <Select
              value={formData.highestEducation}
              onValueChange={(value) =>
                setFormData({ ...formData, highestEducation: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>

              <SelectContent>
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Certifications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCertification}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {certifications.map((cert, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Certification ${index + 1}`}
                  value={cert}
                  onChange={(e) =>
                    updateCertification(index, e.target.value)
                  }
                />
                {certifications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profession */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label>Profession Type</Label>
              <Select
                value={formData.professionType}
                onValueChange={(value) =>
                  setFormData({ ...formData, professionType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>

                <SelectContent>
                  {professionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                placeholder="Industry / Field"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Employment Type</Label>
            <Select
              value={formData.employmentType}
              onValueChange={(value) =>
                setFormData({ ...formData, employmentType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>

              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages Known</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((language) => (
            <div key={language} className="flex items-center gap-2">
              <Checkbox
                checked={selectedLanguages.includes(language)}
                onCheckedChange={() => toggleLanguage(language)}
              />
              <Label>{language}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button onClick={handleNext}>
          Save & Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

    </div>
  )
}
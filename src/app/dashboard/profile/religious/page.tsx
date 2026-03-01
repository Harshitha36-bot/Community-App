"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react"

const gotras = ["Kashyap", "Bharadwaj", "Vishwamitra", "Jamadagni", "Gautam"]

const pravaraByGotra: Record<string, string[]> = {
  Kashyap: ["Kashyap-Avatsara-Naidhruva", "Kashyap-Avatsara"],
  Bharadwaj: ["Angirasa-Barhaspatya-Bharadwaj"],
  Vishwamitra: ["Vishwamitra-Devarata-Audala"],
  Jamadagni: ["Bhargava-Chyavana-Jamadagni"],
  Gautam: ["Angirasa-Ayasya-Gautam"],
}

const upanamaByPravara: Record<string, string[]> = {
  "Kashyap-Avatsara-Naidhruva": ["Kaushik", "Kaushalya"],
  "Angirasa-Barhaspatya-Bharadwaj": ["Gargya", "Bharadwaj"],
  "Vishwamitra-Devarata-Audala": ["Kaushik"],
}

const kuladevataByUpanama: Record<string, string> = {
  Kaushik: "Kalika Devi",
  Gargya: "Renuka Devi",
  Bharadwaj: "Tulja Bhavani",
}

export default function ReligiousPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    gotra: "",
    pravara: "",
    upanama: "",
    kuladevata: "",
    surnameInUse: "",
    surnameAsPerGotra: "",
    priestName: "",
    priestLocation: "",
  })

  const [availablePravara, setAvailablePravara] = useState<string[]>([])
  const [availableUpanama, setAvailableUpanama] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (formData.gotra) {
      setAvailablePravara(pravaraByGotra[formData.gotra] || [])
      setFormData((prev) => ({
        ...prev,
        pravara: "",
        upanama: "",
        kuladevata: "",
      }))
    }
  }, [formData.gotra])

  useEffect(() => {
    if (formData.pravara) {
      setAvailableUpanama(upanamaByPravara[formData.pravara] || [])
      setFormData((prev) => ({
        ...prev,
        upanama: "",
        kuladevata: "",
      }))
    }
  }, [formData.pravara])

  useEffect(() => {
    if (formData.upanama) {
      const deity =
        kuladevataByUpanama[formData.upanama] || ""
      setFormData((prev) => ({
        ...prev,
        kuladevata: deity,
      }))
    }
  }, [formData.upanama])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.gotra) newErrors.gotra = "Required"
    if (!formData.pravara) newErrors.pravara = "Required"
    if (!formData.upanama) newErrors.upanama = "Required"
    if (!formData.surnameInUse.trim())
      newErrors.surnameInUse = "Required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/dashboard/profile/family")
    }
  }

  const handleBack = () => {
    router.push("/dashboard/profile/personal")
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
          Religious Details
        </h1>

        <p className="text-muted-foreground mt-1">
          Step 2 of 7
        </p>
      </div>

      {/* Hierarchical Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>Religious Lineage</CardTitle>
          <CardDescription>
            Select Gotra → Pravara → Upanama
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Visual Flow */}
          <div className="flex justify-center items-center gap-4 p-4 bg-muted rounded-lg">
            <span>Gotra</span>
            <ArrowDown className="h-4 w-4 text-primary" />
            <span>Pravara</span>
            <ArrowDown className="h-4 w-4 text-primary" />
            <span>Upanama</span>
            <ArrowDown className="h-4 w-4 text-primary" />
            <span>Kuladevata</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Gotra */}
            <div>
              <Select
                value={formData.gotra}
                onValueChange={(value) =>
                  setFormData({ ...formData, gotra: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gotra" />
                </SelectTrigger>
                <SelectContent>
                  {gotras.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gotra && (
                <p className="text-xs text-destructive mt-1">
                  {errors.gotra}
                </p>
              )}
            </div>

            {/* Pravara */}
            <div>
              <Select
                value={formData.pravara}
                onValueChange={(value) =>
                  setFormData({ ...formData, pravara: value })
                }
                disabled={!formData.gotra}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      formData.gotra
                        ? "Select Pravara"
                        : "Select Gotra first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availablePravara.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pravara && (
                <p className="text-xs text-destructive mt-1">
                  {errors.pravara}
                </p>
              )}
            </div>

            {/* Upanama */}
            <div>
              <Select
                value={formData.upanama}
                onValueChange={(value) =>
                  setFormData({ ...formData, upanama: value })
                }
                disabled={!formData.pravara}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      formData.pravara
                        ? "Select Upanama"
                        : "Select Pravara first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableUpanama.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.upanama && (
                <p className="text-xs text-destructive mt-1">
                  {errors.upanama}
                </p>
              )}
            </div>

            {/* Kuladevata */}
            <Input
              value={formData.kuladevata}
              readOnly
              placeholder="Auto-filled"
              className="bg-muted"
            />

          </div>
        </CardContent>
      </Card>

      {/* Surname Section */}
      <Card>
        <CardHeader>
          <CardTitle>Surname & Priest Info</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">

          <div>
            <Input
              placeholder="Surname (In Use) *"
              value={formData.surnameInUse}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  surnameInUse: e.target.value,
                })
              }
              className={
                errors.surnameInUse ? "border-destructive" : ""
              }
            />
            {errors.surnameInUse && (
              <p className="text-xs text-destructive mt-1">
                {errors.surnameInUse}
              </p>
            )}
          </div>

          <Input
            placeholder="Surname (As per Gotra)"
            value={formData.surnameAsPerGotra}
            onChange={(e) =>
              setFormData({
                ...formData,
                surnameAsPerGotra: e.target.value,
              })
            }
          />

          <Input
            placeholder="Family Priest Name"
            value={formData.priestName}
            onChange={(e) =>
              setFormData({
                ...formData,
                priestName: e.target.value,
              })
            }
          />

          <Input
            placeholder="Family Priest Location"
            value={formData.priestLocation}
            onChange={(e) =>
              setFormData({
                ...formData,
                priestLocation: e.target.value,
              })
            }
          />

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
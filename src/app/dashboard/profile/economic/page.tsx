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
import { ArrowLeft, ArrowRight, Save, Upload } from "lucide-react"

const incomeSlabs = [
  "Below ₹2 Lakh",
  "₹2-5 Lakh",
  "₹5-10 Lakh",
  "₹10-20 Lakh",
  "₹20-50 Lakh",
  "Above ₹50 Lakh",
]

const assets = [
  "Own House",
  "Agricultural Land",
  "Two Wheeler",
  "Four Wheeler (Car)",
]

const investments = [
  "Fixed Deposit",
  "Mutual Fund / SIP",
  "Shares / Demat Account",
  "Others",
]

export default function EconomicPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    selfIncome: "",
    familyIncome: "",
  })

  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [selectedInvestments, setSelectedInvestments] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const toggleAsset = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset)
        ? prev.filter((a) => a !== asset)
        : [...prev, asset]
    )
  }

  const toggleInvestment = (investment: string) => {
    setSelectedInvestments((prev) =>
      prev.includes(investment)
        ? prev.filter((i) => i !== investment)
        : [...prev, investment]
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.selfIncome) {
      newErrors.selfIncome = "Please select your income slab"
    }

    if (!formData.familyIncome) {
      newErrors.familyIncome = "Please select family income slab"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/dashboard/profile/review")
    }
  }

  const handleBack = () => {
    router.push("/dashboard/profile/education")
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
          Economic Details
        </h1>
        <p className="text-muted-foreground mt-1">
          Step 6 of 7: Provide your financial information
        </p>
      </div>

      {/* Income */}
      <Card>
        <CardHeader>
          <CardTitle>Income Information</CardTitle>
          <CardDescription>
            Annual income details
          </CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Self Income (Annual)
            </Label>

            <Select
              value={formData.selfIncome}
              onValueChange={(value) =>
                setFormData({ ...formData, selfIncome: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>

              <SelectContent>
                {incomeSlabs.map((slab) => (
                  <SelectItem key={slab} value={slab}>
                    {slab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.selfIncome && (
              <p className="text-xs text-destructive">
                {errors.selfIncome}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Family Income (Annual)
            </Label>

            <Select
              value={formData.familyIncome}
              onValueChange={(value) =>
                setFormData({ ...formData, familyIncome: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>

              <SelectContent>
                {incomeSlabs.map((slab) => (
                  <SelectItem key={slab} value={slab}>
                    {slab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.familyIncome && (
              <p className="text-xs text-destructive">
                {errors.familyIncome}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Assets Owned</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div
              key={asset}
              onClick={() => toggleAsset(asset)}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                selectedAssets.includes(asset)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={selectedAssets.includes(asset)}
              />
              <Label className="cursor-pointer">
                {asset}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          {investments.map((investment) => (
            <div
              key={investment}
              onClick={() => toggleInvestment(investment)}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                selectedInvestments.includes(investment)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={selectedInvestments.includes(investment)}
              />
              <Label>
                {investment}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Step
        </Button>

        <Button onClick={handleNext}>
          Save & Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
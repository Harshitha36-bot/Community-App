"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, ArrowRight, Save, Plus, Trash2 } from "lucide-react"

interface FamilyMember {
  id: string
  relation: string
  name: string
  age: string
  gender: string
  status: string
  photo: File | null
}

const relations = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Other",
]

export default function FamilyPage() {
  const router = useRouter()

  const [familyType, setFamilyType] = useState("")
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      relation: "",
      name: "",
      age: "",
      gender: "",
      status: "active",
      photo: null,
    },
  ])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      relation: "",
      name: "",
      age: "",
      gender: "",
      status: "active",
      photo: null,
    }
    setFamilyMembers([...familyMembers, newMember])
  }

  const removeFamilyMember = (id: string) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((m) => m.id !== id))
    }
  }

  const updateFamilyMember = (
    id: string,
    field: keyof FamilyMember,
    value: any
  ) => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!familyType) newErrors.familyType = "Select family type"

    familyMembers.forEach((member, index) => {
      if (!member.relation)
        newErrors[`relation_${index}`] = "Required"

      if (!member.name.trim())
        newErrors[`name_${index}`] = "Required"

      if (!member.age)
        newErrors[`age_${index}`] = "Required"

      if (!member.gender)
        newErrors[`gender_${index}`] = "Required"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/dashboard/profile/location")
    }
  }

  const handleBack = () => {
    router.push("/dashboard/profile/religious")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

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
          Family Information
        </h1>

        <p className="text-muted-foreground mt-1">
          Step 3 of 7
        </p>
      </div>

      {/* Family Type */}
      <Card>
        <CardHeader>
          <CardTitle>Family Type</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Label>
            Type of Family
          </Label>

          <RadioGroup
            value={familyType}
            onValueChange={(value) => setFamilyType(value)}
            className="flex gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="nuclear" id="nuclear" />
              <Label htmlFor="nuclear">Nuclear</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="joint" id="joint" />
              <Label htmlFor="joint">Joint</Label>
            </div>
          </RadioGroup>

          {errors.familyType && (
            <p className="text-xs text-destructive">
              {errors.familyType}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Family Members Table */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Family Members</CardTitle>
          <Button onClick={addFamilyMember} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Relation</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {familyMembers.map((member, index) => (
                  <TableRow key={member.id}>

                    <TableCell>
                      <Select
                        value={member.relation}
                        onValueChange={(value) =>
                          updateFamilyMember(member.id, "relation", value)
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent>
                          {relations.map((rel) => (
                            <SelectItem key={rel} value={rel}>
                              {rel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Input
                        value={member.name}
                        placeholder="Full Name"
                        onChange={(e) =>
                          updateFamilyMember(member.id, "name", e.target.value)
                        }
                        className="h-9"
                      />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="number"
                        value={member.age}
                        placeholder="Age"
                        onChange={(e) =>
                          updateFamilyMember(member.id, "age", e.target.value)
                        }
                        className="h-9"
                      />
                    </TableCell>

                    <TableCell>
                      <Select
                        value={member.gender}
                        onValueChange={(value) =>
                          updateFamilyMember(member.id, "gender", value)
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Select
                        value={member.status}
                        onValueChange={(value) =>
                          updateFamilyMember(member.id, "status", value)
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="passed">Passed</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          updateFamilyMember(
                            member.id,
                            "photo",
                            e.target.files?.[0] || null
                          )
                        }
                        className="h-9 text-xs"
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeFamilyMember(member.id)
                        }
                        disabled={familyMembers.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
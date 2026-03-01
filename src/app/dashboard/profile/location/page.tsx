"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Save, Plus, Trash2, MapPin } from "lucide-react"

interface Address {
  flatNo: string
  building: string
  street: string
  area: string
  city: string
  state: string
  pincode: string
}

interface OldAddress extends Address {
  id: string
}

export default function LocationPage() {
  const router = useRouter()

  const [currentAddress, setCurrentAddress] = useState<Address>({
    flatNo: "",
    building: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [hometownAddress, setHometownAddress] = useState<Address>({
    flatNo: "",
    building: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [oldAddresses, setOldAddresses] = useState<OldAddress[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addOldAddress = () => {
    if (oldAddresses.length < 4) {
      setOldAddresses([
        ...oldAddresses,
        {
          id: Date.now().toString(),
          flatNo: "",
          building: "",
          street: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
        },
      ])
    }
  }

  const removeOldAddress = (id: string) => {
    setOldAddresses(oldAddresses.filter((a) => a.id !== id))
  }

  const updateOldAddress = (
    id: string,
    field: keyof Address,
    value: string
  ) => {
    setOldAddresses(
      oldAddresses.map((addr) =>
        addr.id === id ? { ...addr, [field]: value } : addr
      )
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!currentAddress.city.trim())
      newErrors.currentCity = "City required"

    if (!currentAddress.state.trim())
      newErrors.currentState = "State required"

    if (!currentAddress.pincode.trim())
      newErrors.currentPincode = "Pincode required"

    if (!hometownAddress.city.trim())
      newErrors.hometownCity = "City required"

    if (!hometownAddress.state.trim())
      newErrors.hometownState = "State required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/dashboard/profile/education")
    }
  }

  const handleBack = () => {
    router.push("/dashboard/profile/family")
  }

  const renderAddressFields = (
    address: Address,
    setAddress: (addr: Address) => void,
    prefix: string
  ) => (
    <div className="grid md:grid-cols-2 gap-4">

      <Input
        placeholder="Flat / House No"
        value={address.flatNo}
        onChange={(e) =>
          setAddress({ ...address, flatNo: e.target.value })
        }
      />

      <Input
        placeholder="Building / Society"
        value={address.building}
        onChange={(e) =>
          setAddress({ ...address, building: e.target.value })
        }
      />

      <Input
        placeholder="Street"
        value={address.street}
        onChange={(e) =>
          setAddress({ ...address, street: e.target.value })
        }
      />

      <Input
        placeholder="Area / Locality"
        value={address.area}
        onChange={(e) =>
          setAddress({ ...address, area: e.target.value })
        }
      />

      <div>
        <Input
          placeholder="City *"
          value={address.city}
          onChange={(e) =>
            setAddress({ ...address, city: e.target.value })
          }
          className={errors[`${prefix}City`] ? "border-destructive" : ""}
        />
        {errors[`${prefix}City`] && (
          <p className="text-xs text-destructive">
            {errors[`${prefix}City`]}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="State *"
          value={address.state}
          onChange={(e) =>
            setAddress({ ...address, state: e.target.value })
          }
          className={errors[`${prefix}State`] ? "border-destructive" : ""}
        />
        {errors[`${prefix}State`] && (
          <p className="text-xs text-destructive">
            {errors[`${prefix}State`]}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Pincode *"
          maxLength={6}
          value={address.pincode}
          onChange={(e) =>
            setAddress({ ...address, pincode: e.target.value })
          }
          className={errors[`${prefix}Pincode`] ? "border-destructive" : ""}
        />
        {errors[`${prefix}Pincode`] && (
          <p className="text-xs text-destructive">
            {errors[`${prefix}Pincode`]}
          </p>
        )}
      </div>

    </div>
  )

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
          Location Information
        </h1>

        <p className="text-muted-foreground mt-1">
          Step 4 of 7
        </p>
      </div>

      {/* Current Address */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Current Address</CardTitle>
          </div>
          <CardDescription>
            Your present address
          </CardDescription>
        </CardHeader>

        <CardContent>
          {renderAddressFields(
            currentAddress,
            setCurrentAddress,
            "current"
          )}
        </CardContent>
      </Card>

      {/* Hometown */}
      <Card>
        <CardHeader>
          <CardTitle>Home Town Address</CardTitle>
        </CardHeader>

        <CardContent>
          {renderAddressFields(
            hometownAddress,
            setHometownAddress,
            "hometown"
          )}
        </CardContent>
      </Card>

      {/* Old Addresses */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Previous Addresses</CardTitle>
          <Button
            onClick={addOldAddress}
            size="sm"
            variant="outline"
            disabled={oldAddresses.length >= 4}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>

        {oldAddresses.length > 0 && (
          <CardContent className="space-y-6">
            {oldAddresses.map((addr, index) => (
              <div
                key={addr.id}
                className="p-4 border rounded-lg space-y-4"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    Address {index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOldAddress(addr.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={addr.city}
                    onChange={(e) =>
                      updateOldAddress(
                        addr.id,
                        "city",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="State"
                    value={addr.state}
                    onChange={(e) =>
                      updateOldAddress(
                        addr.id,
                        "state",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Area"
                    value={addr.area}
                    onChange={(e) =>
                      updateOldAddress(
                        addr.id,
                        "area",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Pincode"
                    maxLength={6}
                    value={addr.pincode}
                    onChange={(e) =>
                      updateOldAddress(
                        addr.id,
                        "pincode",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        )}
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
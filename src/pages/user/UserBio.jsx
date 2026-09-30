import { useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon } from "lucide-react";

export default function UserBio() {
  const user = useAuth((s) => s.user);
  const updateBio = useAuth((s) => s.updateBio);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: user.bio?.fullName ?? "",
      phone: user.bio?.phone ?? "",
      birthDate: user.bio?.birthDate ?? "",
      address: user.bio?.address ?? "",
      about: user.bio?.about ?? "",
    },
  });

  const aboutValue = watch("about") ?? "";

  const onSubmit = (data) => {
    const result = updateBio(data);
    if (!result.ok) return;
    reset(data); // resync defaults → isDirty returns to false
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Card>
        <CardContent>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Bio / Detail User</h1>
            <p className="text-sm text-muted-foreground">
              Validated with React Hook Form — save unlocks when the form is valid.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                className="p-3"
                aria-invalid={!!errors.fullName}
                {...register("fullName", {
                  required: "Full name is required.",
                  minLength: { value: 3, message: "At least 3 characters." },
                })}
              />
              {errors.fullName && (
                <p className="text-sm font-medium text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                className="p-3"
                placeholder="0812xxxxxxx"
                aria-invalid={!!errors.phone}
                {...register("phone", {
                  required: "Phone is required.",
                  pattern: {
                    value: /^[0-9+\-\s]{8,15}$/,
                    message: "Only digits, +, - and spaces (8–15 chars).",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm font-medium text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth date</Label>
              <Input
                id="birthDate"
                type="date"
                className="p-3"
                aria-invalid={!!errors.birthDate}
                {...register("birthDate", {
                  required: "Birth date is required.",
                  validate: (v) =>
                    new Date(v) < new Date() || "Birth date must be in the past.",
                })}
              />
              {errors.birthDate && (
                <p className="text-sm font-medium text-destructive">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="p-3"
                aria-invalid={!!errors.address}
                {...register("address", {
                  required: "Address is required.",
                  minLength: { value: 8, message: "At least 8 characters." },
                })}
              />
              {errors.address && (
                <p className="text-sm font-medium text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="about">About me</Label>
                <span className="text-xs text-muted-foreground">
                  {aboutValue.length}/200
                </span>
              </div>
              <Textarea
                id="about"
                rows={4}
                aria-invalid={!!errors.about}
                {...register("about", {
                  required: "Tell us something about you.",
                  maxLength: { value: 200, message: "Max 200 characters." },
                })}
              />
              {errors.about && (
                <p className="text-sm font-medium text-destructive">
                  {errors.about.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={!isValid || !isDirty}>
                Save bio
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>
            </div>

            {isDirty && !isValid && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircleIcon className="size-3.5" />
                Fix the errors above to enable saving.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
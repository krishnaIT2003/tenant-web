"use client";
import { handler } from "@/services/adminApiService";
import { useState } from "react";
import { z } from "zod";

const onboardSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type OnboardForm = z.infer<typeof onboardSchema>;

export function OnboardClientModal({
  open,
  onClose,
  fetchTenants,
}: {
  open: boolean;
  onClose: () => void;
  fetchTenants: () => Promise<void>;
}) {
  const [form, setForm] = useState<OnboardForm>({
    email: "",
    password: "",
    businessName: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof OnboardForm, string>>
  >({});

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    const result = onboardSchema?.safeParse(form);

    if (!result?.success) {
      const fieldErrors: typeof errors = {};
      result?.error?.errors.forEach((err) => {
        const field = err?.path[0] as keyof OnboardForm;
        fieldErrors[field] = err?.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}tenants/onboard/`;
    const payload = {
      admin_password: form?.password,
      admin_email: form?.email,
      business_name: form?.businessName,
    };
    const response = await handler.apiCall(url, "POST", payload);
    if (response) {
      setLoading(false);
      onClose();
      setForm({
        email: "",
        password: "",
        businessName: "",
      });
      fetchTenants();
    }
  };

  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center z-50">
      <div className="bg-card text-card-foreground rounded-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Onboard Client</h2>

        <div className="space-y-3">
          <div>
            <input
              placeholder="Business Name"
              className="w-full border border-input rounded-md px-3 py-2 text-black"
              value={form?.businessName}
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
            />
            {errors?.businessName && (
              <p className="text-sm text-destructive mt-1">
                {errors?.businessName}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Email"
              className="w-full border border-input rounded-md px-3 py-2 text-black"
              value={form?.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors?.email && (
              <p className="text-sm text-destructive mt-1">{errors?.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-input rounded-md px-3 py-2 text-black"
              value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors?.password && (
              <p className="text-sm text-destructive mt-1">
                {errors?.password}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-muted-foreground">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateSubscriptionModal({
  open,
  onClose,
  onSuccess,
  subscriptionPlan,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subscriptionPlan: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    billing_cycle: "",
    trial_days: "",
    daily_api_limit: "",
    monthly_api_limit: "",
    api_rate_limit: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      price: form?.price,
      trial_days: Number(form?.trial_days),
      daily_api_limit: Number(form?.daily_api_limit),
      monthly_api_limit: Number(form?.monthly_api_limit),
      api_rate_limit: Number(form?.api_rate_limit),
    };

    subscriptionPlan(payload);

    setLoading(false);
    setForm({
      name: "",
      code: "",
      price: "",
      billing_cycle: "",
      trial_days: "",
      daily_api_limit: "",
      monthly_api_limit: "",
      api_rate_limit: "",
    });
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Subscription</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            placeholder="Code"
            value={form.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />

          <Input
            placeholder="Price"
            type="Code"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />

          <Select
            value={form.billing_cycle}
            onValueChange={(value) => handleChange("billing_cycle", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Billing Cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Trial Days"
            type="number"
            value={form.trial_days}
            onChange={(e) => handleChange("trial_days", e.target.value)}
          />

          <Input
            placeholder="Daily API Limit"
            type="number"
            value={form.daily_api_limit}
            onChange={(e) => handleChange("daily_api_limit", e.target.value)}
          />

          <Input
            placeholder="Monthly API Limit"
            type="number"
            value={form.monthly_api_limit}
            onChange={(e) => handleChange("monthly_api_limit", e.target.value)}
          />

          <Input
            placeholder="API Rate Limit"
            type="number"
            value={form.api_rate_limit}
            onChange={(e) => handleChange("api_rate_limit", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

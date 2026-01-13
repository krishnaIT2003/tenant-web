"use client";

import { useEffect, useState } from "react";
import { OnboardClientModal } from "../../../components/onboard-clinent-modal";
import {
  deleteTenant,
  fetchAllTenants,
  updateTenantStatus,
} from "../admin-apis";
import TenantTable from "@/components/tenant-table";
import { useToast } from "@/hooks/use-toast";

export default function ClientOnboardingPage() {
  const [open, setOpen] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [status, setStatus] = useState<"activate" | "deactivate">("activate");
  const { toast } = useToast();

  const fetchData = async () => {
    const fetchTenants = await fetchAllTenants();
    if (fetchTenants) {
      setTenants(fetchTenants);
    }
  };

  const openStatusModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setStatus(tenant?.is_active ? "activate" : "deactivate");
    setStatusModalOpen(true);
  };

  const openDeleteModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setDeleteModalOpen(true);
  };

  const handleStatusSave = async (status: string) => {
    const updatedStatus = await updateTenantStatus(
      status,
      selectedTenant?.domain
    );
    if (updatedStatus) {
      const updatedData = tenants?.map((tenant) =>
        tenant?.domain === selectedTenant?.domain
          ? { ...tenant, is_active: !tenant.is_active }
          : tenant
      );
      setTenants(updatedData || []);
    }
    setStatusModalOpen(false);
  };

  const handleDelete = async () => {
    const deletedData = await deleteTenant(selectedTenant?.domain);
    if (deletedData) {
      toast({
        title: "Success",
        description: deletedData?.status,
        duration: 2000,
      });
      fetchData();
    }
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Client Onboarding</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90"
        >
          Onboard Client
        </button>
      </div>

      <TenantTable
        tenants={tenants}
        openStatusModal={openStatusModal}
        handleStatusSave={handleStatusSave}
        handleDelete={handleDelete}
        statusModalOpen={statusModalOpen}
        deleteModalOpen={deleteModalOpen}
        openDeleteModal={openDeleteModal}
        setStatusModalOpen={setStatusModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        setStatus={setStatus}
        status={status}
      />

      <OnboardClientModal
        open={open}
        onClose={() => setOpen(false)}
        fetchTenants={fetchData}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import GenericTable from "@/components/table/GenericTable";
import PageHeader from "@/components/PageHeader";
import { userColumns } from "./columns/userColumns";
import { fetchUsers } from "@/services/users.api";
import SwalModal from "@/components/ui/SwalModal";

export default function UsersPage() {
  const [refreshKey] = useState(0);

  const handleChangeStatus = async (uuid, currentStatus) => {
    const result = await SwalModal({
      icon: "warning",
      title: "Change status?",
      text: "Are you sure you want to change the status?",
      confirmButtonText: "Yes, change",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      SwalModal.showLoading("Updating status...");

      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Or:
      // await changeStatusApi(uuid, currentStatus);

      SwalModal.close();

      await SwalModal({
        icon: "success",
        title: "Status updated",
        text: "The change has been applied.",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } catch (error) {
      SwalModal.close();

      await SwalModal({
        icon: "error",
        title: "Could not update status",
        text: error.message || "Something went wrong, please try again",
        showCancelButton: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        subtitle="Everyone with access to this workspace"
      />

      <GenericTable
        columnsConfig={userColumns({
          handleChangeStatus,
        })}
        fetchData={fetchUsers}
        refreshKey={refreshKey}
      />
    </div>
  );
}

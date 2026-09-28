"use client";
import React from "react";
import ResponsiveModal from "./ResponsiveModal";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import CreateTaskFormWrapper from "./CreateTaskFormWrapper";

const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateTaskModal;

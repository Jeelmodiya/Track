"use client";
import React from "react";
import ResponsiveModal from "./ResponsiveModal";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import CreateProjectForm from "./CreateProjectForm";

const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;

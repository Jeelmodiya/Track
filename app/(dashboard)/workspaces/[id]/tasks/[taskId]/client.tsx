"use client";

import { DottedSeparator } from "@/components/Dotted-Separator";
import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import TaskBreadCrumbs from "@/components/TaskBreadCrumbs";
import TaskDescription from "@/components/TaskDescription";
import TaskOverView from "@/components/TaskOverView";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import React from "react";

const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }
  if (!data) {
    return <PageError message="Task not found" />;
  }
  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverView task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};

export default TaskIdClient;

import { Task } from "@/features/tasks/types";
import React from "react";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "./Dotted-Separator";
import OverviewProperty from "./OverviewProperty";
import MemberAvatar from "./MemberAvatar";
import TaskDate from "./TaskDate";
import { Badge } from "./ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";

interface TaskOverViewProps {
  task: Task;
}

const TaskOverView = ({ task }: TaskOverViewProps) => {
  const { open } = useEditTaskModal();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button size="sm" variant="secondary" onClick={() => open(task.$id)}>
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverView;

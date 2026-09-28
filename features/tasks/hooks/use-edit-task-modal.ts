import { parseAsString, useQueryState } from "nuqs";
import React from "react";

export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  // Update stable function references
  const open = React.useCallback(
    (id: string) => {
      setTaskId(id);
    },
    [setTaskId]
  );

  const close = React.useCallback(() => {
    setTaskId(null);
  }, [setTaskId]);

  return { taskId, open, close, setTaskId };
};

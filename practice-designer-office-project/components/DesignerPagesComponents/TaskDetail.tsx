import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DesignItemCard from "@/components/helpers/DesignItemCard/DesignItemCard";

const TaskDetail: React.FC<{
  taskId: string | string[] | undefined;
}> = (props) => {
  console.log(props.taskId);
  const { selectDesign } = useRequest() as requestContextInterface;
  const design = selectDesign(props.taskId as string);
  return (
    <DesignItemCard
      itemId={props.taskId}
      item={design}
      waitingForContent={"processing"}
    />
  );
};

export default TaskDetail;

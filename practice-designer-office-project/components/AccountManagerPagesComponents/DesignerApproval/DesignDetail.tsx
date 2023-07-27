import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DesignAmItemCard from "@/components/helpers/DesignItemCard/DesignAmItemCard";

const DesignDetail: React.FC<{
  designId: string | string[] | undefined;
}> = (props) => {
  console.log(props.designId);
  const { selectDesign } = useRequest() as requestContextInterface;
  const design = selectDesign(props.designId as string);
  return <DesignAmItemCard itemId={props.designId} item={design} />;
};

export default DesignDetail;

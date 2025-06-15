import React from "react";
import { Handle, Position } from "reactflow";

export const CustomImageNode = ({ data, id }) => {
  // 支持拖拽自身到Docker
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: "image",
        data,
        id, // 带上自己的id
      })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="rounded-lg border border-green-500 bg-green-50 p-2 shadow-md w-40"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="text-green-800 font-bold text-sm">Image</div>

      <div className="mt-1 text-xs">
        <div>
          <strong>Name:</strong> {data.name || "image-xxx"}
        </div>
        <div>
          <strong>Tag:</strong> {data.tag || "latest"}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

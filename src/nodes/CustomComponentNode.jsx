import React from "react";
import { Handle, Position } from "reactflow";

export const CustomComponentNode = ({ data }) => {
  return (
    <div className="rounded-lg border border-orange-500 bg-orange-50 p-2 shadow-md w-48">
      <div className="text-orange-800 font-bold text-sm">Component</div>

      <div className="mt-1 text-xs">
        <div>
          <strong>名称:</strong> {data.name || "component-xxx"}
        </div>
        <div>
          <strong>IP:</strong> {data.ip || "${ip}"}
        </div>
        <div>
          <strong>端口:</strong> {data.port || ""}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

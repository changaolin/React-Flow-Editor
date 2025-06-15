import React from "react";
import { Handle, Position } from "reactflow";

export const CustomConnectNode = ({ data }) => {
  return (
    <div className="rounded-lg border border-gray-500 bg-gray-50 p-2 shadow-md w-48">
      <div className="text-gray-800 font-bold text-sm">Connect</div>

      <div className="mt-1 text-xs">
        <div>
          <strong>源:</strong> {data.src?.name || "未连接"}
        </div>
        <div>
          <strong>目标:</strong> {data.dst?.name || "未连接"}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
    </div>
  );
};

import React from "react";
import { Handle, Position } from "reactflow";

export const CustomServerNode = ({ data }) => {
  return (
    <div className="rounded-lg border border-purple-500 bg-purple-50 p-2 shadow-md w-48">
      <div className="text-purple-800 font-bold text-sm">Server</div>

      <div className="mt-1 text-xs">
        <div>
          <strong>IP:</strong> {data.ip || "10.90.2.81"}
        </div>
        <div>
          <strong>架构:</strong> {data.arch || "x86"}
        </div>
        <div>
          <strong>OS:</strong> {data.os || "ubuntu"}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

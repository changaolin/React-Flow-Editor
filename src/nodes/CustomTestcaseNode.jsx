import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

export const CustomTestcaseNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();
  const style = "rounded-lg border border-red-500 bg-red-50 p-2 shadow-md w-48";

  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/reactflow");
    if (!raw) return;

    const dragged = JSON.parse(raw);
    if (dragged.type !== "component") return;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          const components = node.data.components
            ? [...node.data.components]
            : [];
          if (!components.find((comp) => comp.id === dragged.id)) {
            components.push(dragged.data);
          }
          return { ...node, data: { ...node.data, components } };
        }
        return node;
      })
    );
  };

  return (
    <div
      className={style}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="text-red-800 font-bold text-sm">Testcase</div>

      <div className="mt-2 border-t pt-1 text-xs max-h-24 overflow-auto">
        <div className="font-semibold">Components:</div>
        {data.components && data.components.length > 0 ? (
          data.components.map((comp, idx) => (
            <div key={idx} className="ml-2 mb-1 border rounded p-1 bg-white">
              <div>
                <strong>名称:</strong> {comp.name}
              </div>
              <div>
                <strong>IP:</strong> {comp.ip}
              </div>
              <div>
                <strong>端口:</strong> {comp.port}
              </div>
            </div>
          ))
        ) : (
          <div className="ml-2 italic text-gray-400">拖拽 Component 到这里</div>
        )}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

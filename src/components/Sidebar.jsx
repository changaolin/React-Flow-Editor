import React from "react";

const nodeTypes = [
  {
    type: "server",
    label: "Server",
    icon: "🖥️",
    defaultData: {
      ip: "10.90.2.81",
      arch: "x86",
      os: "ubuntu",
    },
  },
  {
    type: "docker",
    label: "Docker",
    icon: "🐳",
    defaultData: {
      name: "docker-xxx",
      port: "8080:80",
      images: [],
    },
  },
  {
    type: "image",
    label: "Image",
    icon: "📦",
    defaultData: {
      name: "open-skyeye",
      tag: "latest",
    },
  },
  {
    type: "connect",
    label: "Connect",
    icon: "🔗",
    defaultData: {
      src: null,
      dst: null,
    },
  },
  {
    type: "component",
    label: "Component",
    icon: "⚙️",
    defaultData: {
      name: "",
      ip: "",
      port: "",
    },
  },
  {
    type: "testcase",
    label: "Testcase",
    icon: "🧪",
    defaultData: {
      components: [],
    },
  },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType, defaultData) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: nodeType,
        data: defaultData,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-48 bg-gray-100 p-4 border-r border-gray-200 h-screen">
      <h3 className="text-lg font-semibold mb-4">组件</h3>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-2 bg-white rounded shadow cursor-move hover:bg-gray-50"
            draggable
            onDragStart={(e) => onDragStart(e, node.type, node.defaultData)}
          >
            <span className="mr-2">{node.icon}</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

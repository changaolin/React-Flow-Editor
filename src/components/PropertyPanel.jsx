import React from "react";
import { useReactFlow } from "reactflow";

const PropertyPanel = ({ selectedNode }) => {
  const { setNodes } = useReactFlow();

  if (!selectedNode) {
    return (
      <div className="w-64 bg-gray-100 p-4 border-l border-gray-200 h-screen">
        <p className="text-gray-500 italic">请选择一个节点来编辑属性</p>
      </div>
    );
  }

  const updateNodeData = (newData) => {
    if (selectedNode.type === "image" && selectedNode.parentId) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode.parentId) {
            const images = node.data.images ? [...node.data.images] : [];
            images[selectedNode.index] = {
              ...images[selectedNode.index],
              ...newData,
            };
            return {
              ...node,
              data: { ...node.data, images },
            };
          }
          return node;
        })
      );
    } else {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: { ...node.data, ...newData },
            };
          }
          return node;
        })
      );
    }
  };

  const renderPropertyFields = () => {
    switch (selectedNode.type) {
      case "server":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                IP
              </label>
              <input
                type="text"
                value={selectedNode.data.ip}
                onChange={(e) => updateNodeData({ ip: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                架构
              </label>
              <select
                value={selectedNode.data.arch}
                onChange={(e) => updateNodeData({ arch: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="x86">x86</option>
                <option value="arm64">arm64</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                操作系统
              </label>
              <select
                value={selectedNode.data.os}
                onChange={(e) => updateNodeData({ os: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="ubuntu">Ubuntu</option>
                <option value="centos">CentOS</option>
              </select>
            </div>
          </>
        );

      case "docker":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                名称
              </label>
              <input
                type="text"
                value={selectedNode.data.name}
                onChange={(e) => updateNodeData({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                端口映射
              </label>
              <input
                type="text"
                value={selectedNode.data.port}
                onChange={(e) => updateNodeData({ port: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="8080:80"
              />
            </div>
          </>
        );

      case "image":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                镜像名称
              </label>
              <input
                type="text"
                value={selectedNode.name || selectedNode.data.name}
                onChange={(e) => updateNodeData({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                标签
              </label>
              <input
                type="text"
                value={selectedNode.tag || selectedNode.data.tag}
                onChange={(e) => updateNodeData({ tag: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        );

      case "component":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                组件名称
              </label>
              <input
                type="text"
                value={selectedNode.data.name}
                onChange={(e) => updateNodeData({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                IP
              </label>
              <input
                type="text"
                value={selectedNode.data.ip}
                onChange={(e) => updateNodeData({ ip: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="${ip}"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                端口
              </label>
              <input
                type="text"
                value={selectedNode.data.port}
                onChange={(e) => updateNodeData({ port: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        );

      default:
        return <p className="text-gray-500">该节点类型暂不支持属性编辑</p>;
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-l border-gray-200 h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">属性配置</h3>
      {renderPropertyFields()}
    </div>
  );
};

export default PropertyPanel;

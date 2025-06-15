import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

export const CustomDockerNode = (props) => {
  const { data, id } = props;
  const setSelectedNode = data.setSelectedNode;
  const selectedImageInfo = data.selectedImageInfo;
  const { setNodes } = useReactFlow();
  const style =
    "rounded-lg border border-blue-500 bg-blue-50 p-2 shadow-md w-80";

  // 拖拽Image到Docker
  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/reactflow");
    if (!raw) return;
    const dragged = JSON.parse(raw);
    if (dragged.type !== "image") return;
    setNodes((prevNodes) => {
      let newNodes = prevNodes.map((node) => {
        if (node.id === id) {
          const images = node.data.images ? [...node.data.images] : [];
          // 生成唯一id，防止重复
          const newImg = {
            ...dragged.data,
            id: `image-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          };
          images.push(newImg);
          return { ...node, data: { ...node.data, images } };
        }
        return node;
      });
      // 删除被拖进去的Image节点
      if (dragged.id) {
        newNodes = newNodes.filter(
          (node) => !(node.type === "image" && node.id === dragged.id)
        );
      }
      return newNodes;
    });
  };

  // 删除Image
  const handleDeleteImage = (imgIdx) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          const images = node.data.images ? [...node.data.images] : [];
          images.splice(imgIdx, 1);
          return { ...node, data: { ...node.data, images } };
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
      <div className="text-blue-800 font-bold text-sm mb-2">Docker</div>
      <div className="mb-2 text-xs">
        <div>
          <strong>Name:</strong> {data.name || "docker-xxx"}
        </div>
        <div>
          <strong>Port:</strong> {data.port || "8080:80"}
        </div>
      </div>
      {/* 嵌套 Images 卡片区 */}
      <div className="mt-2 border-t pt-2 text-xs flex flex-wrap gap-3 min-h-[100px]">
        {data.images && data.images.length > 0 ? (
          data.images.map((img, idx) => (
            <div
              key={img.id || idx}
              className={`relative border rounded-lg p-3 bg-white w-32 h-28 shadow cursor-pointer transition ring-2 ${
                selectedImageInfo &&
                selectedImageInfo.parentId === id &&
                selectedImageInfo.index === idx
                  ? "ring-blue-400"
                  : "ring-transparent"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (setSelectedNode) {
                  setSelectedNode({
                    ...img,
                    type: "image",
                    parentId: id,
                    index: idx,
                  });
                }
              }}
            >
              <button
                className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(idx);
                }}
                title="删除"
              >
                ×
              </button>
              <div className="font-bold text-green-700 mb-1">
                {img.name || "image"}
              </div>
              <div>Tag: {img.tag || ""}</div>
            </div>
          ))
        ) : (
          <div className="ml-2 italic text-gray-400">拖拽 Image 到此处</div>
        )}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

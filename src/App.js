import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import Sidebar from "./components/Sidebar";
import PropertyPanel from "./components/PropertyPanel";
import { CustomDockerNode } from "./nodes/CustomDockerNode";
import { CustomImageNode } from "./nodes/CustomImageNode";
import { CustomServerNode } from "./nodes/CustomServerNode";
import { CustomComponentNode } from "./nodes/CustomComponentNode";
import { CustomTestcaseNode } from "./nodes/CustomTestcaseNode";
import { CustomConnectNode } from "./nodes/CustomConnectNode";

const { Sider, Content } = Layout;

const nodeTypes = {
  server: CustomServerNode,
  docker: CustomDockerNode,
  image: CustomImageNode,
  component: CustomComponentNode,
  testcase: CustomTestcaseNode,
  connect: CustomConnectNode,
};

function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const hasNodes = nodes && nodes.length > 0;

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;
      const { type, data } = JSON.parse(raw);
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // 用于高亮 Docker 内部选中的 image
  const getSelectedImageInfo = (dockerId) => {
    if (selectedNode && selectedNode.type === 'image' && selectedNode.parentId === dockerId) {
      return { parentId: selectedNode.parentId, index: selectedNode.index };
    }
    return null;
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <Sider width={220} style={{ background: '#f3f4f6', borderRight: '1px solid #eee' }}>
        <Sidebar />
      </Sider>
      <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#f3f4f6' }}>
        <div style={{ width: 1200, margin: '24px 0 8px 0', fontWeight: 700, fontSize: 18, color: '#374151' }}>流程图编辑区</div>
        <div style={{ width: 1200, height: 800, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e5e7eb', border: '1px solid #d1d5db', position: 'relative', overflow: 'hidden' }}>
          <ReactFlow
            nodes={nodes.map((node) => {
              if (node.type === 'docker') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    setSelectedNode,
                    selectedImageInfo: getSelectedImageInfo(node.id),
                  },
                };
              }
              return node;
            })}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView={false}
            snapToGrid
            snapGrid={[15, 15]}
            className="bg-gray-50"
            style={{ width: '100%', height: '100%' }}
          >
            <MiniMap
              className="!bg-white !border !border-gray-200"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'server': return '#9333ea';
                  case 'docker': return '#3b82f6';
                  case 'image': return '#22c55e';
                  case 'component': return '#f97316';
                  case 'testcase': return '#ef4444';
                  case 'connect': return '#6b7280';
                  default: return '#6b7280';
                }
              }}
            />
            <Controls className="!bg-white !border !border-gray-200" />
            <Background
              color="#e5e7eb"
              gap={16}
              size={1}
              className="opacity-50"
            />
          </ReactFlow>
          {!hasNodes && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-gray-400 text-xl select-none">请从左侧拖拽组件到此处</div>
            </div>
          )}
        </div>
      </Content>
      <Sider width={260} style={{ background: '#f3f4f6', borderLeft: '1px solid #eee' }}>
        <PropertyPanel selectedNode={selectedNode} />
      </Sider>
    </Layout>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}

export default App;
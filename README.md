# React Flow Editor

## 项目简介

本项目是一个基于 React + React Flow 的可视化流程图编辑器，支持拖拽式组件面板、流程图画布、节点嵌套、属性配置、结构化数据导出等功能。适用于云原生、自动化运维、测试编排等场景。

## 主要功能

- 拖拽式组件面板（Server、Docker、Image、Connect、Component、Testcase）
- 流程图画布支持节点放置、连接、嵌套（如 Docker ⊃ Image）
- 节点属性配置（右侧属性面板实时编辑）
- 支持节点间语义连接（如 Connect 的 src/dst）
- 嵌套结构递归渲染（如 Docker 内部平铺多个 Image 卡片）
- 拖拽 Image 到 Docker 后自动从画布移除
- 数据结构化导出，便于后端或模拟执行

## 技术栈

- React 18
- React Flow 11
- Ant Design（布局）
- Tailwind CSS（样式）
- Zustand（状态管理）

## 安装与运行

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm start
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 用法说明

- 从左侧面板拖拽组件到画布进行流程图编辑。
- 支持将 Image 节点拖拽到 Docker 节点内部，自动嵌套为卡片并从画布移除。
- 点击任意节点或嵌套卡片，右侧属性面板可实时编辑属性。
- 支持删除 Docker 内部的 Image 卡片。
- 支持多种节点类型和嵌套关系。

## 目录结构

```
src/
  components/         # 侧边栏、属性面板等
  nodes/              # 各类自定义节点组件
  App.js              # 主应用入口
  index.js            # 入口文件
  index.css           # 全局样式
```

## 关键设计说明

- **嵌套结构**：如 Docker 节点的 data.images 数组存储所有嵌套的 Image 信息，递归渲染。
- **属性编辑**：选中节点后，属性面板根据类型动态渲染表单，支持嵌套节点属性的编辑。
- **节点去重**：Image 拖入 Docker 后，画布自动移除原 Image 节点，避免冗余。

## 未来可扩展

- 支持节点拖动排序、复制、批量操作
- 支持更多类型的嵌套与连接
- 支持导出/导入 JSON
- 支持流程模拟与执行

---

如有问题或建议，欢迎提 issue 或 PR！
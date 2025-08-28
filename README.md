# 🌐 MIB文件管理平台

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Go-Backend-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go">
</div>

<div align="center">
  <h3>🚀 现代化的 SNMP MIB 文件管理与配置生成平台</h3>
  <p>支持批量上传、智能解析、跨文件OID选择、配置生成和远程部署的企业级解决方案</p>
</div>

---

## ✨ 核心特性

### 🗂️ **智能文件管理**
- 📦 **批量上传**: 支持ZIP压缩包批量上传MIB文件
- 🔍 **智能解析**: 自动解析MIB文件结构和OID信息
- 📋 **分级导航**: 批次 → 文件 → OID 三级目录结构
- 🏷️ **版本管理**: 自动记录上传时间和文件版本

### 🎯 **革命性OID选择体验**
- 🔄 **跨文件选择**: 在多个MIB文件之间自由切换，选择状态持久保存
- 🧠 **智能搜索**: 支持中英文搜索，内置专业术语翻译
- 🎨 **可视化管理**: 实时显示选择数量和来源文件分布
- ⚡ **批量操作**: 全选、取消全选、批量管理

### 🌏 **专业中文化**
- 📖 **智能翻译**: 内置SNMP专业术语中文翻译库
- 🎓 **领域适配**: 根据设备类型和MIB文件类型提供专业翻译
- 💡 **通俗解释**: 复杂技术术语提供通俗易懂的中文说明
- 🔍 **语义搜索**: 支持中文关键词搜索英文OID

### ⚙️ **多工具配置生成**
- 🛠️ **双引擎支持**: 支持 snmp-exporter 和 categraf 配置生成
- 📊 **版本管理**: 自动获取最新工具版本信息
- 🎛️ **参数配置**: 完整的SNMP参数配置（版本、社区字符串、超时等）
- 👁️ **实时预览**: 生成前预览配置内容

### 🚀 **企业级部署**
- 🖥️ **主机管理**: 管理目标主机列表和连接信息
- 📡 **远程部署**: 一键将配置文件部署到远程服务器
- 🔄 **批量部署**: 同时部署到多个主机
- 📊 **任务监控**: 部署任务状态实时跟踪

---

## 🛠️ 技术栈

### 前端技术
- **Next.js 15.2.4** - React全栈框架
- **React 19** - 用户界面库
- **TypeScript 5** - 类型安全的JavaScript
- **Tailwind CSS 3.4.17** - 实用优先的CSS框架
- **Radix UI** - 无样式组件库
- **Lucide React** - 现代图标库

### 后端技术
- **Go** - 高性能后端语言
- **Next.js API Routes** - 服务端API
- **MySQL** - 关系型数据库
- **Redis** - 内存缓存数据库

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: 19.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **Go**: 1.19 或更高版本 (后端开发)
- **Docker**: 20.0.0 或更高版本 (可选，用于容器化部署)

### 📦 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/Oumu33/mib-platform.git
cd mib-platform
```

2. **安装依赖**
```bash
# 安装前端依赖
npm install

# 如果遇到依赖冲突，使用
npm install --legacy-peer-deps
```

3. **启动开发服务器**
```bash
# 启动前端开发服务器
npm run dev

# 启动后端服务 (另一个终端)
cd backend
go run main.go
```

4. **访问应用**
```
🌐 前端应用: http://localhost:3003
🔧 API文档:  http://localhost:8080/docs
```

### 🐳 Docker 部署

```bash
# 使用 Docker Compose 一键启动
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">
  <h3>🚀 如果这个项目对你有帮助，请给它一个 ⭐ Star！</h3>
  <p>你的支持是我们持续改进的动力 💪</p>
</div>

---

<div align="center">
  <sub>Built with ❤️ by F6 | Last updated: 2025-01-28</sub>
</div>
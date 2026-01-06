# Full Stack Web Application

这是一个前后端分离的全栈 Web 应用项目。

## 项目结构

```
.
├── web/           # 前端项目 (Next.js)
├── server/        # 后端服务 (Express + SQLite)
└── README.md      # 项目说明文档
```

## 快速开始

### 前端启动

```bash
cd web
pnpm install
pnpm dev
```

前端将在 [http://localhost:3000](http://localhost:3000) 运行

### 后端启动

```bash
cd server
pnpm install
pnpm dev
```

后端 API 将在 [http://localhost:3001](http://localhost:3001) 运行

## 技术栈

- **前端**: Next.js 16, React, TypeScript, TailwindCSS
- **后端**: Express.js, SQLite, sql.js
- **API**: RESTful API with CORS support

## 功能特性

- 个人主页展示
- 留言板功能（支持点赞、点踩、爱心）
- 响应式设计（支持移动端和桌面端）
- 平滑动画效果
- 实时评论展示

更多前端细节请查看 [web/README.md](web/README.md)

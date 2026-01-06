# 留言板服务端

这是一个使用 Express + SQLite 构建的简单留言板服务端。

## 功能

- 获取所有留言
- 创建新留言
- 点赞/点踩/爱心功能
- SQLite 数据持久化

## 安装和运行

1. 安装依赖：
```bash
cd server
npm install
```

2. 启动服务端：
```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务端默认运行在 `http://localhost:3001`

## API 端点

### 获取所有留言
```
GET /api/messages
```

### 创建新留言
```
POST /api/messages
Body: {
  "name": "string (max 10 chars)",
  "content": "string (max 100 chars)"
}
```

### 点赞
```
POST /api/messages/:id/like
```

### 点踩
```
POST /api/messages/:id/dislike
```

### 爱心
```
POST /api/messages/:id/love
```

## 数据库

留言数据存储在 SQLite 数据库文件 `messages.db` 中。数据库会自动创建，包含以下表结构：

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  love INTEGER DEFAULT 0
)
```

## 配置

可以通过环境变量配置端口：

```bash
PORT=3001 npm start
```

前端可以通过 `NEXT_PUBLIC_API_URL` 环境变量指定 API 地址：

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

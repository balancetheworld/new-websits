import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import initSqlJs from 'sql.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'messages.db')

// 初始化数据库
let db
let SQL

async function initialize() {
  SQL = await initSqlJs()

  // 如果数据库文件存在，加载它
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath)
    db = new SQL.Database(buffer)
  }
  else {
    // 创建新数据库
    db = new SQL.Database()
    createTables()
    saveDatabase()
  }
}

// 创建表
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      likes INTEGER DEFAULT 0,
      dislikes INTEGER DEFAULT 0,
      love INTEGER DEFAULT 0
    )
  `)
}

// 保存数据库到文件
function saveDatabase() {
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(dbPath, buffer)
}

// 数据库操作方法
export const dbOperations = {
  // 获取所有留言
  getAllMessages() {
    const results = db.exec('SELECT * FROM messages ORDER BY id DESC')
    if (results.length === 0)
      return []

    const columns = results[0].columns
    const values = results[0].values

    return values.map((row) => {
      const obj = {}
      columns.forEach((col, index) => {
        obj[col] = row[index]
      })
      return obj
    })
  },

  // 创建新留言
  createMessage(name, content) {
    // 插入消息（使用本地时间）
    const stmt = db.prepare(
      'INSERT INTO messages (name, content, timestamp, likes, dislikes, love) VALUES (:name, :content, datetime("now", "localtime"), 0, 0, 0)',
    )
    stmt.bind({ ':name': name, ':content': content })
    stmt.step()
    stmt.free()

    // 获取最后插入的 ID
    const lastIdResult = db.exec('SELECT last_insert_rowid() as id')
    if (lastIdResult.length === 0 || lastIdResult[0].values.length === 0) {
      throw new Error('Failed to get inserted message ID')
    }

    const lastId = lastIdResult[0].values[0][0]

    // 直接从数据库中获取刚创建的记录（在保存前）
    const stmt2 = db.prepare('SELECT * FROM messages WHERE id = :id')
    stmt2.bind({ ':id': lastId })
    const hasRow = stmt2.step()
    const results = stmt2.getAsObject()
    stmt2.free()

    if (!hasRow || !results || !results.id) {
      saveDatabase() // 即使失败也保存
      throw new Error('Failed to retrieve created message')
    }

    // 保存到文件
    saveDatabase()

    return results
  },

  // 根据 ID 获取留言
  getMessageById(id) {
    const results = db.exec(`SELECT * FROM messages WHERE id = ${id}`)
    if (results.length === 0 || results[0].values.length === 0)
      return null

    const columns = results[0].columns
    const values = results[0].values[0]

    const obj = {}
    columns.forEach((col, index) => {
      obj[col] = values[index]
    })
    return obj
  },

  // 更新点赞数
  updateLikes(id) {
    db.run(`UPDATE messages SET likes = likes + 1 WHERE id = ${id}`)
    saveDatabase()
    return this.getMessageById(id)
  },

  // 更新点踩数
  updateDislikes(id) {
    db.run(`UPDATE messages SET dislikes = dislikes + 1 WHERE id = ${id}`)
    saveDatabase()
    return this.getMessageById(id)
  },

  // 更新爱心数
  updateLove(id) {
    db.run(`UPDATE messages SET love = love + 1 WHERE id = ${id}`)
    saveDatabase()
    return this.getMessageById(id)
  },
}

// 导出初始化函数
export async function initDatabase() {
  if (!db) {
    await initialize()
  }
}

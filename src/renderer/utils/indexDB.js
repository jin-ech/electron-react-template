/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-09-14 14:35:45
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-14 15:16:18
 * @FilePath: \electron-react-template\src\utils\indexDB.js
 * @Description: 数据持久化
 */

/**
 * @description: 创建数据库
 * @param dbName 数据库名
 * @param storeName 表名
 * @param version 版本
 * @param keyPath 表主键
 * @param indexName 索引名
 * @param columnIndex 索引的字段名，默认就是主键
 * @return {*}
 */
export function openDB({
    dbName,
    storeName,
    version = 1,
    keyPath = 'id',
    indexName = 'index',
    columnIndex
}) {
    return new Promise((resolve, reject) => {
        let indexedDB = window.indexedDB
        let db
        const request = indexedDB.open(dbName, version)
        request.onsuccess = function (event) {
            db = event.target.result // 数据库对象
            resolve(db)
        }

        request.onerror = function (event) {
            reject(event)
        }

        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            db = event.target.result // 数据库对象
            let objectStore

            if (!db.objectStoreNames.contains(storeName)) {
                objectStore = db.createObjectStore(storeName, { keyPath }) // 创建表
                objectStore.createIndex(indexName, columnIndex || keyPath, { unique: true }) // 创建索引
            }
        }
    });
}

/**
 * @description: 新增数据
 * @return {*}
 */
export function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
            .objectStore(storeName) // 仓库对象
            .add(data)

        request.onsuccess = function (event) {
            resolve(event)
        }

        request.onerror = function (event) {
            throw new Error(event.target.error)
            reject(event)
        }
    })
}

/**
 * @description: 通过主键读取数据
 * @param {*} db
 * @param {*} storeName
 * @param {*} key
 * @return {*}
 */
export function getDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([storeName]) // 事务
        let objectStore = transaction.objectStore(storeName) // 仓库对象
        let request = objectStore.get(key)

        request.onerror = function (event) {
            reject(event)
        }

        request.onsuccess = function (event) {
            resolve(request.result)
        }
    })
}

/**
 * @description: 通过游标读取数据
 * @param {*} db
 * @param {*} storeName
 * @return {*}
 */
export function cursorGetData(db, storeName) {
    let list = []
    let store = db.transaction(storeName, 'readwrite') // 事务
        .objectStore(storeName) // 仓库对象
    let request = store.openCursor() // 指针对象
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            let cursor = e.target.result
            if (cursor) {
                // 必须要检查
                list.push(cursor.value)
                cursor.continue() // 遍历了存储对象中的所有内容
            } else {
                resolve(list)
            }
        }
        request.onerror = function (e) {
            reject(e)
        }
    })
}

/**
 * @description: 通过索引读取数据
 * @param {*} db
 * @param {*} storeName
 * @param {*} indexName
 * @param {*} indexValue
 * @return {*}
 */
export function getDataByIndex(db, storeName, indexName, indexValue) {
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    let request = store.index(indexName).get(indexValue)
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e)
        }
        request.onsuccess = function (e) {
            resolve(e.target.result)
        }
    })
}

/**
 * @description: 获取表所有数据
 * @param {*} db
 * @param {*} storeName
 * @return {*}
 */
export function getDataAll(db, storeName) {
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    var request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e)
        }
        request.onsuccess = function (e) {
            resolve(request.result)
        }
    })
}

/**
 * @description: 通过索引和游标查询记录
 * @param {*} db
 * @param {*} storeName
 * @param {*} indexName
 * @param {*} indexValue
 * @return {*}
 */
export function cursorGetDataByIndex(db, storeName, indexName, indexValue) {
    let list = []
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
    let request = store.index(indexName) // 索引对象
        .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            let cursor = e.target.result
            if (cursor) {
                list.push(cursor.value)
                cursor.continue() // 遍历了存储对象中的所有内容
            } else {
                resolve(list)
            }
        }
        request.onerror = function (ev) {
            reject(ev)
        }
    })
}

/**
 * @description: 更新数据
 * @param {*} db
 * @param {*} storeName
 * @param {*} data
 * @return {*}
 */
export function updateDB(db, storeName, data) {
    let request = db.transaction([storeName], 'readwrite') // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data)

    return new Promise((resolve, reject) => {
        request.onsuccess = function (ev) {
            resolve(ev)
        }

        request.onerror = function (ev) {
            resolve(ev)
        }
    })
}

/**
 * @description: 删除数据
 * @param {*} db
 * @param {*} storeName
 * @param {*} id
 * @return {*}
 */
export function deleteDB(db, storeName, id) {
    let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

    return new Promise((resolve, reject) => {
        request.onsuccess = function (ev) {
            resolve(ev)
        }

        request.onerror = function (ev) {
            resolve(ev)
        }
    })
}

/**
 * @description: 删除数据库
 * @param {*} dbName
 * @return {*}
 */
export function deleteDBAll(dbName) {
    let deleteRequest = window.indexedDB.deleteDatabase(dbName)
    return new Promise((resolve, reject) => {
        deleteRequest.onerror = function (event) {
            console.log('[error occured on delete db]: ', dbName)
        }
        deleteRequest.onsuccess = function (event) {
            console.log('delete db success')
        }
    })
}

/**
 * @description: 关闭数据库
 * @param {*} db
 * @return {*}
 */
export function closeDB(db) {
    db.close()
    console.log('db is colsed')
}

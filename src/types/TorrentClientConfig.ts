export interface TorrentClientConfig {
  id : number;              // 主键ID，自增
  name: string;             // 客户端名称
  url : string;             // 客户端地址
  username : string;        // 用户名
  password : string;        // 密码
  type : string;            // 客户端类型 (比如 qb / tr)
  version : string;         // 版本
  createDate : string;      // 创建时间（后端 Date -> 前端 string）
  updateDate : string;      // 更新时间（后端 Date -> 前端 string）
}
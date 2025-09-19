/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SystemConfig {
  configKey?: string;
  configValue?: string;
  description?: string;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
}

/** 统一响应体 */
export interface ResultSystemConfig {
  /**
   * 状态码
   * @format int32
   */
  code?: number;
  /** 消息 */
  message?: string;
  /** 数据 */
  data?: SystemConfig;
  /**
   * 时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface Site {
  siteName?: string;
  url?: string;
  apiKey?: string;
  cookie?: string;
  userAgent?: string;
  username?: string;
  email?: string;
  /** @format int32 */
  userId?: number;
  userdetailUrl?: string;
  uploaderName?: string;
  uploaderUrl?: string;
  /** @format int32 */
  foreverInviteCount?: number;
  /** @format double */
  bonus?: number;
  /** @format double */
  seeding?: number;
  /** @format int32 */
  tempInviteCount?: number;
  shareRate?: string;
  uploadCount?: string;
  downloadCount?: string;
  userLevel?: string;
  /** @format int32 */
  claimCount?: number;
  /** @format int32 */
  claimLimit?: number;
  /** @format date-time */
  joinTime?: string;
  /** @format date-time */
  activeTime?: string;
  /** @format int32 */
  autoAttendance?: number;
  /** @format int32 */
  active?: number;
  /** @format int32 */
  proxy?: number;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
  rss?: string;
  /** @format int32 */
  pri?: number;
  proxyEnable?: boolean;
}

/** 导入站点请求参数 */
export interface ImportSiteRequest {
  /**
   * 导入类型
   * @example "MoviePilot"
   */
  type?: string;
  /**
   * 导入文件
   * @format binary
   */
  file?: File;
}

/** 导入站点请求参数 */
export interface ImportSiteFromCookieCloud {
  /**
   * 站点URL
   * @example "https://10.0.1.100:3000/cookiecloud"
   */
  url?: string;
  /**
   * 用户密钥
   * @example 123456
   */
  userKey?: string;
  /**
   * 密码
   * @example 123456
   */
  password?: string;
}

/** 统一响应体 */
export interface ResultListSite {
  /**
   * 状态码
   * @format int32
   */
  code?: number;
  /** 消息 */
  message?: string;
  /** 数据 */
  data?: Site[];
  /**
   * 时间戳
   * @format int64
   */
  timestamp?: number;
}

/** 统一响应体 */
export interface ResultListSiteMeta {
  /**
   * 状态码
   * @format int32
   */
  code?: number;
  /** 消息 */
  message?: string;
  /** 数据 */
  data?: SiteMeta[];
  /**
   * 时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface SiteMeta {
  /** @format int32 */
  id?: number;
  detailClass?: string;
  siteName?: string;
  urlPatterns?: string[];
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
  /** @format int32 */
  supportAutoAttend?: number;
}

/** 统一响应体 */
export interface ResultTestAllSiteConnectivityResponse {
  /**
   * 状态码
   * @format int32
   */
  code?: number;
  /** 消息 */
  message?: string;
  /** 数据 */
  data?: TestAllSiteConnectivityResponse;
  /**
   * 时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface TestAllSiteConnectivityResponse {
  successResult?: Site[];
  failResult?: Site[];
}

export interface JobKey {
  name?: string;
  group?: string;
}

/** 站点签到记录响应 */
export interface AttendResponse {
  /**
   * 需要签到的站点数量
   * @format int64
   */
  needAttendSiteCount?: number;
  /**
   * 已执行签到脚本的站点数量
   * @format int64
   */
  attendSiteCount?: number;
  /**
   * 签到总次数
   * @format int32
   */
  sumAttends?: number;
  /**
   * 已执行签到脚本的站点数量
   * @format int32
   */
  maxConsecutiveDays?: number;
  /**
   * 最高签到奖励
   * @format int32
   */
  maxBonus?: number;
  /** 站点签到信息 */
  siteAttends?: SiteAttend[];
}

/** 站点签到记录 */
export interface SiteAttend {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
  siteName?: string;
  username?: string;
  /** @format int32 */
  userId?: number;
  /**
   * 第几次签到
   * @format int32
   * @example 1
   */
  attendCount?: number;
  /** @format int32 */
  consecutiveDays?: number;
  /** @format int32 */
  bonus?: number;
  /** @format int64 */
  joinedDays?: number;
  /** @format int32 */
  continuousFromJoined?: number;
  /** @format int32 */
  success?: number;
  failReason?: string;
}

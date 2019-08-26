/** 
 * api接口的统一出口
 */
// 文章模块接口
import article from '@/api/article.js';
// 日志模块接口
import log from '@/api/log.js';
// 登录模块接口
import login from '@/api/login.js';
// 其他模块的接口……

// 导出接口
export default {
    article,
    login,
    log
    // ……
}
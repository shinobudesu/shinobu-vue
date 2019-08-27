/**
 * 登录模块接口列表
 */

import base from '@/api/base.js'; // 导入接口域名列表
import axios from '@/api/axios.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const log = {
    // 列表信息   
    logList(params) {
        return axios.post(`${base.dev}/api/backstage/log`, qs.stringify(params));
    },
    // 按照执行人查询列表信息   
    logListByuser(params) {
        return axios.post(`${base.dev}/api/backstage/logbyuser`, qs.stringify(params));
    }
    // 其他接口…………
}

export default log;
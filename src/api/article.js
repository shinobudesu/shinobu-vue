/**
 * article模块接口列表
 */

import base from '@/api/base.js'; // 导入接口域名列表
import axios from '@/api/axios.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 文章信息   
    articleList(params) {
        return axios.post(`${base.dev}/api/backstage/article`, qs.stringify(params));
    },
    // 按照标题查询列表信息   
    articleListBytitle(params) {
        return axios.post(`${base.dev}/api/backstage/articlebytitle`, qs.stringify(params));
    },
    // 按照ID查询信息   
    articleListByid(params) {
        return axios.post(`${base.dev}/api/backstage/articlebyid`, qs.stringify(params));
    },
    //删除指定文章
    articleDel(params) {
        return axios.post(`${base.dev}/api/backstage/articledel`, qs.stringify(params));
    },
    //编辑指定文章
    articleEdt(params) {
        return axios.post(`${base.dev}/api/backstage/articleedt`, qs.stringify(params));
    },
    // 其他接口…………
}

export default article;
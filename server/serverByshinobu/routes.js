// 引入模块依赖
const express = require("express");
const router = express.Router();
const mysql = require("./mysql.js");
// 引入jwt
const Jwt = require("./jwt");
// //查询menu
router.get("/api/menu", function(req, res, next) {
    //token过期验证
    // let authorization = req.headers.authorization;
    // if (authorization != undefined) {
    //   let jwt = new Jwt(authorization);
    //   let token = jwt.verifyToken();
    let sql = "select c_name,c_code from dsc_code where c_type='menu'";
    // if (token != "err") {
    mysql.query(sql, function(err, rows) {
        if (err) {
            res.json(err).end();
        } else {
            res.json(rows).end();
        }
    });
    //   } else {
    //     res.json({msg: "登录过期"}).end();
    //   }
    // } else {
    //   res.json({msg: "登录过期"}).end();
    // }
});

//查询pixiv列表
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
router.post("/api/illus/search", function(req, res, next) {
    let sql1 = "select count(*) as num from dsc_pivix";
    let sql2 = "select p_id,p_title,p_image,p_tag,p_createdate from dsc_pivix where p_id between " + mysql.pool.escape(req.query.pagepre) + " and " + mysql.pool.escape(req.query.pagenext) + " limit " + req.query.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {
            data.push(err);
        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {
                    data.push(err);
                } else {
                    data.push(rows);
                    res.json(data).end();
                }
            });
        }
    });
});

//查询pixiv详情
router.post("/api/illus/searchdetails", function(req, res, next) {
    let sql = "select * from dsc_pivix where p_id = " + mysql.pool.escape(req.query.id);
    mysql.query(sql, function(err, rows) {
        if (err) {
            res.json(err).end();
        } else {
            res.json(rows).end();
        }
    });
});

//查询animate列表
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
router.post("/api/anima/search", function(req, res, next) {
    let sql1 = "select count(*) as num from dsc_animate";
    let sql2 = "select a_id,a_title,a_desc,a_image,a_createdate,a_state,a_tag,a_date,a_time from dsc_animate where a_id between " + mysql.pool.escape(req.query.pagepre) + " and " + mysql.pool.escape(req.query.pagenext) + " limit " + req.query.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {
            data.push(err);
        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {
                    data.push(err);
                } else {
                    data.push(rows);
                    res.json(data).end();
                }
            });
        }
    });
});

//查询animate详情
router.post("/api/anima/searchdetails", function(req, res, next) {
    let sql = "select * from dsc_animate where a_id = " + mysql.pool.escape(req.query.id);
    mysql.query(sql, function(err, rows) {
        if (err) {
            res.json(err).end();
        } else {
            res.json(rows).end();
        }
    });
});

//查询technology列表
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
router.post("/api/techn/search", function(req, res, next) {
    let sql1 = "select count(*) as num from dsc_technology";
    let sql2 = "select * from dsc_technology where t_id between " + mysql.pool.escape(req.query.pagepre) + " and " + mysql.pool.escape(req.query.pagenext) + " limit " + req.query.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {
            data.push(err);
        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {
                    data.push(err);
                } else {
                    data.push(rows);
                    res.json(data).end();
                }
            });
        }
    });
});






//登录
router.post("/api/login", async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let sql = "select * from sh_userinfo where u_username =" + mysql.pool.escape(username);
    let sql2 = "select * from sh_userinfo where u_username =" + mysql.pool.escape(username) + " and u_password= " + mysql.pool.escape(password);
    await mysql.query(sql, function(err, rows) {
        if (err) {
            res.json(err).end();
        } else {
            if (rows != "") {
                loginLog({ 'username': username });
                mysql.query(sql2, function(err, rows) {
                    if (err) {
                        res.json(err).end();
                    } else {
                        if (rows != "") {
                            // 登陆成功，添加token验证
                            let _id = rows[0].u_id;
                            // 将用户id传入并生成token
                            let jwt = new Jwt(_id);
                            let token = jwt.generateToken();
                            // 将 token 返回给客户端
                            res.json({ msg: "登陆成功", token: token, data: rows }).end();
                        } else {
                            res.json({ msg: "密码错误" }).end();
                        }
                    }
                });
            } else {
                res.json({ msg: "账号不存在" }).end();
            }
        }
    });
});

//登录日志插入
const loginLog = (params) => {
    let sql = "insert into sh_log (l_optusername,l_optcontent) values (?,?)";
    let value = [params.username, '登录'];
    mysql.insert(sql, value, function(err, rows) {});
}

//查询登录日志
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
router.post("/api/backstage/log", function(req, res, next) {
    let sql1 = "select count(*) as num from sh_log";
    let sql2 = "select * from (select *,(@i :=@i + 1) as no from sh_log,(select @i := 0) as it order by l_creatdate desc)t where t.no  between " + mysql.pool.escape(req.body.pagepre) + " and " + mysql.pool.escape(req.body.pagenext) + "  limit " + req.body.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {

        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {} else {
                    rows.map(function(item) {
                        item.l_creatdate = timeFormat(item.l_creatdate);
                    });
                    data.push(rows);
                    res.json(data).end();
                }
            });
        }
    });
});

//按照执行人查询登录日志
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
// username 执行人
router.post("/api/backstage/logbyuser", function(req, res, next) {
    let sql1 = "select count(*) as num from sh_log where l_optusername like " + mysql.pool.escape(req.body.username);
    let sql2 = "select * from (select *,(@i :=@i + 1) as no from sh_log,(select @i := 0) as it where l_optusername like " + mysql.pool.escape(req.body.username) + " order by l_creatdate desc)t where t.no  between " + mysql.pool.escape(req.body.pagepre) + " and " + mysql.pool.escape(req.body.pagenext) + "  limit " + req.body.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {

        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {

                } else {
                    rows.map(function(item) {
                        item.l_creatdate = timeFormat(item.l_creatdate);
                    });
                    data.push(rows);
                    res.json(data).end();
                }

            });
        }
    });
});

//查询文章列表
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
router.post("/api/backstage/article", function(req, res, next) {
    let sql1 = "select count(*) as num from sh_article";
    let sql2 = "select * from (select *,(@i :=@i + 1) as no from sh_article,(select @i := 0) as it order by a_createdate desc)t where t.no  between " + mysql.pool.escape(req.body.pagepre) + " and " + mysql.pool.escape(req.body.pagenext) + "  limit " + req.body.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {

        } else {
            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {

                } else {
                    rows.map(function(item) {
                        item.a_createdate = timeFormat(item.a_createdate);
                    });
                    data.push(rows);
                    res.json(data).end();
                }

            });
        }
    });
});

//按标题查询文章列表
// pagepre 页码范围前
// pagenext 页码范围后
// page 每页条数
// title 文章标题
router.post("/api/backstage/articlebytitle", function(req, res, next) {
    let sql1 = "select count(*) as num from sh_article where a_title like " + mysql.pool.escape(req.body.title);
    let sql2 = "select * from (select *,(@i :=@i + 1) as no from sh_article,(select @i := 0) as it where a_title like " + mysql.pool.escape(req.body.title) + " order by a_createdate desc)t where t.no  between " + mysql.pool.escape(req.body.pagepre) + " and " + mysql.pool.escape(req.body.pagenext) + "  limit " + req.body.page;
    let data = [];
    //查询总页数
    mysql.query(sql1, function(err, rows) {
        if (err) {

        } else {

            data.push(rows);
            //查询当前页
            mysql.query(sql2, function(err, rows) {
                if (err) {

                } else {
                    rows.map(function(item) {
                        item.a_createdate = timeFormat(item.a_createdate);
                    });
                    data.push(rows);
                    res.json(data).end();
                }

            });
        }
    });
});

//按ID查询文章
// a_id  文章ID
router.post("/api/backstage/articlebyid", function(req, res, next) {
    let sql1 = "select * from sh_article where a_id = " + mysql.pool.escape(req.body.a_id);
    let data = [];
    mysql.query(sql1, function(err, rows) {
        if (err) {} else {
            data.push({
                status: 'OK',
                code: '200'
            });
            data.push(rows);
            res.json(data).end();
        }
    });
});

// 删除某篇文章
// a_id 文章id
router.post("/api/backstage/articledel", function(req, res, next) {
    let sql1 = "delete from sh_article where a_id =" + mysql.pool.escape(req.body.a_id);
    let data = [];
    mysql.query(sql1, function(err, rows) {
        if (err) {} else {
            data.push({
                status: 'OK',
                code: '200'
            });
            res.json(data).end();
        }

    });
});

// 修改某篇文章
router.post("/api/backstage/articleedt", function(req, res, next) {
    let sql1 = "update sh_article " + computedParams(req.body, 'a_id') + " where a_id =" + mysql.pool.escape(req.body.a_id);
    let data = [];
    mysql.query(sql1, function(err, rows) {
        if (err) {} else {
            data.push({
                status: 'OK',
                code: '200'
            });
            res.json(data).end();
        }

    });
});

// 保存新文章
router.post("/api/backstage/articleins", function(req, res, next) {
    let sql1 = "insert into sh_article (a_title,a_content,a_type,a_createuid,a_createusername) VALUES (?,?,?,?,?)";
    let data = [];
    let value = [req.body.a_title, req.body.a_content, req.body.a_type, req.body.a_createuid, req.body.a_createusername];
    mysql.insert(sql1, value, function(err, rows) {
        if (err) {} else {
            data.push({
                status: 'OK',
                code: '200'
            });
            res.json(data).end();
        }

    });
});

//格式化时间
function timeFormat(time) {
    var d = new Date(time);

    var year = d.getFullYear(); //年  
    var month = d.getMonth() + 1; //月  
    var day = d.getDate(); //日  

    var hh = d.getHours(); //时  
    var mm = d.getMinutes(); //分  
    var ss = d.getSeconds(); //秒  

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

//编辑返回参数处理
function computedParams(obj, id) {
    let str = "set ";
    for (let a in obj) {
        if (obj[a].trim() != '' && a != id) {
            str += a + '="' + obj[a] + '",';
        }
    }
    str = str.substr(0, str.length - 1);
    return str;
}
module.exports = router;
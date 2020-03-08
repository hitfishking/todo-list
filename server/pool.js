/**
* @module mysql数据库连接池
* @author: Javanx <www.javanx.cn>
* @date: 2019-06-05 14:17:51
*/

//建立connection pool，并从中取得一个connection实例，这些对上层应用都应该是不可见的；
//这就是本模块存在的意义：封装这些底层机制，对上层只输出一个query()函数。
//从这个问题可见，node的库逻辑层面还是较低的，还需要较多的上层工作。

var mysql = require('mysql')

var pool = mysql.createPool({
    host: '127.0.0.1', // 数据库地址
    port: '3306', // 端口
    user: 'root', // 用户名称
    password: 'yasun000', // 用户密码
    database: 'todo-list' // 要链接的数据库名称
});


let query = (sql, callback) => {    
  pool.getConnection((err,conn) => {    
      if(err){
          callback(err,null,null);    
      }else{    
          conn.query(sql, (qerr,vals,fields) => {    
              //释放连接    
              conn.release();    
              //事件驱动回调    
              callback(qerr, vals, fields);    
          });    
      }    
  })  
}

module.exports = query // 暴露出这个接口
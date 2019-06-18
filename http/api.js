const http=require('http');
const fs=require('fs');
const app=http.createServer((req,res)=>{
    const {method,url}=req;
    console.log(url, method);
    if(method==='GET'&&url==='/') {
        fs.readFile('./index.html',(err,data)=>{
            res.setHeader('Content-Type','text/html');
            res.end(data);
        })
    }else if(method==='GET'&&url==='/api/users') {
        //设置session
        console.log(req.headers.cookie);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Set-Cookie','cookie1=aaa');
        //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify([{name:'sofiya',age:18}]))
    }else if(method==='POST'&&url==='/api/save') {
        let reqData=[];
        let size=0;
        req.on('data',data=>{
            console.log('>>>req on',data);
            reqData.push(data);
            size+=data.length;
        });
        req.on('end',function(){
            console.log('end');
            const data=Buffer.concat(reqData,size);
            console.log('data:', size, data.toString());
            res.end(`formdata:${data.toString()}`)
        })
    }
    // else if(method==='OPTIONS'&&url==='/api/users') {
    //     //允许鉴权
    //     res.setHeader('Access-Control-Allow-Credentials', 'true');
    //     res.writeHead(200, {
    //         "Access-Control-Allow-Origin": "http://localhost:3000",
    //         "Access-Control-Allow-Headers": "X-Token,Content-Type",
    //         "Access-Control-Allow-Methods": "PUT"
    //     });
    //     res.end();
    // }
});
module.exports=app;
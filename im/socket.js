const net=require('net');

const chatServer=net.createServer();

const clientList=[];

chatServer.on('connection',client=>{
    client.write('Hi！\n');
    clientList.push(client);
    client.on('data',data=>{
        clientList.forEach(v=>{
            v.write(data);
        })
    })
});

chatServer.listen(9099);
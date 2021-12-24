var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const {User}= require('./models')
const fs = require('fs');
const NodeRSA = require('node-rsa');
const cors=require("cors");
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
//const { home } = require('nodemon/lib/utils');
app.use(bodyParser.json())
app.use(cookieParser())
/**
 * by using privatekey , Server decrypt password sent from client  
 */
function decrypt(Epassword) {
    let password=''
    const privateKey = fs.readFileSync('./rsa/rsa_1024_priv.pem');
    const nodersa = new NodeRSA(privateKey);
    nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    password = nodersa.decrypt(Epassword, 'utf-8');
    return password
}


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.use(express.json())//  convert text to application.json


app.use( express.static(__dirname + '/Client'));

let users=[]

io.on('connection',async(socket)=>{ //it will be activated when user connet 
    //console.log('a user connected');


    // register
    socket.on('register',async(data) => {
        //console.log(data)
        username= data.username,
        Encryptpassword= data.password,
        avatar= JSON.stringify(data.avatar) 
        console.log('Encrypt password From client :  ',Encryptpassword)
        password =decrypt(Encryptpassword)
        console.log('Decrypt password  : ',password)
        const user = await User.findOne({
 
  
            username: username
        
           })
    
         if(user){ 
           // console.log('user exit')
            socket.emit('userexist')
      
        }else{           
            const user = await User.create({  
                username: username,
                password: password,
                avatar:'avatar',
                id :  socket.id,
                      
               })
        // console.log(user.id)
        //const users= await User.find() //Database content
        // console.log('Data base',users)
         socket.emit('registersuccess')
    
        }
     })


       // login
        socket.on('login',async(data) => {
            //console.log(data)
            username= data.username,
            Encryptpassword= data.password,
            avatar= data.avatar
            console.log('Encrypt password From client',Encryptpassword)
            password =decrypt(Encryptpassword)
            console.log('Decrypt password',password)
            //console.log(password)
            //console.log(avatar)
            const user = await User.findOne({username: username })           
           //if user not in database
               if(!user){ 
                socket.emit('nouser')
                return 
               }
                const ispasswordValid = require('bcrypt').compareSync(
                    password,
                    user.password
                )
                if(!ispasswordValid){
                    socket.emit('passwordwrong')
                 return
                }
               // console.log(user)
                users.push({...data,id: socket.id}) // refresh avatar
                io.emit('loginsuccess',data.username + ' join chat room')
                io.emit('user list', users)               
             })
          
         // send message
         socket.on('send message', data=>{
            //Attaches the user who is currently sending the message
            data.user=users.find(u=> u.id==socket.id)//遍历users 找到与目前发消息用户id的用户信息
            console.log('EncryptMessage : ',data)
            //console.log(users)
         
            if (data.id == ''){
                   // broadcast message to other user  except myself
                socket.broadcast.emit('get message', data)  
            }else{
                  // only send message to specific user
                  const privateSocket= io.sockets.sockets.get(data.id)
                  privateSocket.emit('get message', data)
            
            }
           
         })

        // when one user leave chat room  ,, at this time, we need to notify other users , someone leave
         socket.on('disconnect',()=>{
            const user=users.find(u=> socket.id==u.id)
            if(user){
                 // broadcast some one leave
                io.emit('leave', user.username + 'leave chat room')
                //delete user who leave chat room in users array
                users.splice(users.findIndex(u=> u.id==socket.id),1)
                // send the newest user list to all of client 
                io.emit('user list', users)
            }
           
         })

});



http.listen(3001, function(){
  console.log('http://localhost:3001')
})
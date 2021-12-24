const socket=io()
   
function passwordencrypt(originalpassword){
    const encrypt = new JSEncrypt();
        const key = `
            -----BEGIN PUBLIC KEY-----
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD3EO65hE1Q5im0z4xIl0ViPEnU
            GmvUTM63/2Um8HlpYJlyym/xH+7RhvjiuzDxxFcdAeZrqe6hOQRswS4NK46vgX26
            EiNSndrtrmFOH5TDRfbUtEpvAb0NCDIHDvmvcfZd0m/gtZ37Zk0WMIExki5RO2XD
            i+nQmn6oUnzjyXigYQIDAQAB   
            -----END PUBLIC KEY-----
        `;
    encrypt.setPublicKey(key);
    const Epassword = encrypt.encrypt(originalpassword);
    return Epassword
}
function messageEncrypt(message){
    const encrypt = new JSEncrypt();
        const key = `
        -----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD3EO65hE1Q5im0z4xIl0ViPEnU
        GmvUTM63/2Um8HlpYJlyym/xH+7RhvjiuzDxxFcdAeZrqe6hOQRswS4NK46vgX26
        EiNSndrtrmFOH5TDRfbUtEpvAb0NCDIHDvmvcfZd0m/gtZ37Zk0WMIExki5RO2XD
        i+nQmn6oUnzjyXigYQIDAQAB   
        -----END PUBLIC KEY-----
        `;
    encrypt.setPublicKey(key);
    const Emessage = encrypt.encrypt(message);
    return Emessage
}
function messageDecrypt(Emessage){
    const decrypt = new JSEncrypt();
        const key = `
        -----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQD3EO65hE1Q5im0z4xIl0ViPEnUGmvUTM63/2Um8HlpYJlyym/x
H+7RhvjiuzDxxFcdAeZrqe6hOQRswS4NK46vgX26EiNSndrtrmFOH5TDRfbUtEpv
Ab0NCDIHDvmvcfZd0m/gtZ37Zk0WMIExki5RO2XDi+nQmn6oUnzjyXigYQIDAQAB
AoGBAMhWrJ02ENOmru701RYPw61SobMh8Ynm9kDxEX6vxGOUdxlD2d22PRsdzTdc
/uUshk75OXTYCK4m49WkF8mKJlnGSmjAx5e0PaubBUtRjnn1E+EV8PnRIs/HIIxP
fIxBuS8M2SYtpoh4gCjRltHLXrc1tfzBXcKWOXsd2OSO3hZZAkEA/uJWnWHwI3W8
DmPn9hG+Qdl0vLPlJyU3JwwXPfovcQwBKkKX3m6wrMqcuMGaOEoDw1rqozEdQge+
PDfVeXpKZwJBAPgl1Qg/0RVtlhdC66KjdiWznY/QWNeh3FNHFRek6E5Z5cahe2iW
DbavByodZXPsBGEJ9Wu9S+Y6JwJzj1vmEfcCQEZl01ByvXW9zewXkfi329mqKwD3
muId+EazozO+Bx5tF2FJtVJ9NhTzfSfWaTcE0ldBpC7goNkc9GEDdtWvfh8CQQCC
u3O7b9uYfW6IfMIlohaZkEJfRPW5TNYFrbpIBaI5vRTYC7U3iW5aI2YT4v7TDrHT
6eo5Q7Zb6aEponYRhWlLAkEA2uJF4OughwILbozR2lOT9Xl0A+tTXNVulX6q4TNx
kq9IQ/blt7j2bYCnNfATxDdXt7h5YSEvdH4xRSTGhGXbaA==
-----END RSA PRIVATE KEY-----
        `;
    decrypt.setPublicKey(key);
    const message = decrypt.decrypt(Emessage);
    return message
}


/**
 * sent message
 */
function sendMessage() {
    const originalmsg = document.getElementById('input-msg').value
    if (!originalmsg) return error('can not sent empty message!')
    const msg= messageEncrypt(originalmsg)
    socket.emit('send message',{msg, id: privateID})
    showMsg(originalmsg, 'me', userme)
    document.getElementById('input-msg').value = ''
    privateID =''
}

/**
 * display message
 */
function showMsg(msg, who, user) {
    const chatItem = document.createElement('div')
    chatItem.className = `bubble ${who}`
    chatItem.innerHTML = `
		<img src="${user.avatar}" alt="" />
		<p class="username">${user.username}</p>
		<span>${msg}</span>
	`
    document.getElementById('chat-list').appendChild(chatItem)
    scrollBottom()
}

/**
 * chat region rolling down to bottom
 */
function scrollBottom() {
    const chatList = document.getElementById('chat-list')
    chatList.scrollTop = chatList.scrollHeight
}


/**
 * display error message
 */
 function error(msg) {
    document.getElementById('message-content').innerText = msg
    document.getElementById('message-error').style.display = 'block'
    setTimeout(() => {
        document.getElementById('message-error').style.display = 'none'
    }, 2000)
}
/**
 * notify someone has successfuly joined chat room
 */
function notify(data){        
    let div = document.createElement('div')
    div.className ='conversation-start'
    div.innerHTML =  `<span>${data}</span>`
    document.getElementById('chat-list').append(div) 
    scrollBottom()
    }   /// notify someone join chat room

let privateID=''  
    
/**
 * click other user avatar ,and then start private communication
 */ 
function touser(username, id){

    console.log(socket.id)
    console.log(username, id);
    if(id == socket.id){
        error('cannot start private communication with yourself')
        return
    }
    privateID=id
    document.getElementById('input-msg').value=`private ${username}: `

}



/**
 * listening user list
 */ 
socket.on('user list',data =>{

   // console.log(data) 
    let str =''
    data.map(item => {
        str +=`                
        <li class="person" onclick="touser('${item.username}','${item.id}')">
        <img src="${item.avatar}" alt=""/>
        <span class="name">${item.username}</span>  
    </li>
    `
    })      
    document.getElementById('userlist').innerHTML = str
})
/**
 * listening receieve message
 */ 
socket.on('get message', data => {

    //console.log(data);
    //display message,  ' you 'means that the message sent by other users
    const msg = messageDecrypt(data.msg)

    showMsg(msg,'you',data.user)

})



/**
 * chooser avatar
 */
let avatar = ''
const imgs = document.getElementsByClassName('avatar')
for (let i = 0; i < imgs.length; i++) {
    imgs.item(i).onclick = function () {
        const active = document.querySelector('.active')
        if (active) active.className = 'avatar'
        this.className = 'avatar active'
        avatar = this.getAttribute('data-src')
    }
}




let userme={}
/**
 * login chat room
 */
document.getElementById('join-btn').onclick = () => {
    const username = document.getElementById('join-input').value
    const originalpassword = document.getElementById('join-password').value
    if (!avatar || !username|| !originalpassword) return error('please complete information')
    // encrypt password
    const password = passwordencrypt(originalpassword)

    userme ={username,avatar,password}
    socket.emit('login',userme)
    socket.on('nouser',()=>{
        error('no user please register first！');
    })
    socket.on('passwordwrong',()=>{
        error('password wrong please try again！');
    })

    socket.on('loginsuccess',data => {

        //alert('log in success!!');
        notify(data)  
        document.getElementById('join').style.display = 'none'
        document.getElementById('register').style.display = 'none'
        document.getElementById('chat').style.display = 'block'

    })

 
}

/**
 * someone leave chat room
 */
socket.on('leave',data=>{

    notify(data)
})




// register

document.getElementById('register-btn').onclick = () => {
    const username = document.getElementById('register-input').value
    const originalpassword = document.getElementById('register-password').value
    if ( !username|| !originalpassword) return error('please complete information')
 // encrypt password
    const password = passwordencrypt(originalpassword)

    const user ={username,avatar,password}
    socket.emit('register',user)
    socket.on('userexist',()=>{
        error('user exist please try again！');
    })
    socket.on('registersuccess',() => {
        alert('register success');
        document.getElementById('register').style.display = 'noon'      
     setTimeout(function(){
        document.getElementById('join').style.display = 'block'
   //delay 0.3 second
   },300);
      

    })

 
}


document.getElementById('backjoin-btn').onclick = () => {
    document.getElementById('register').style.display = 'noon'
    document.getElementById('join').style.display = 'block'
   document.getElementById('chat').style.display = 'noon'

}
document.getElementById('backregister-btn').onclick = () => {
    document.getElementById('register').style.display = 'block'
    document.getElementById('join').style.display = 'none'
   document.getElementById('chat').style.display = 'noon'
}



/**
 * click sent messege 
 */
document.getElementById('btn-send').onclick = sendMessage
document.onkeydown = event => {
    const e = event || window.e;
    const keyCode = e.keyCode || e.which;
    if (keyCode == 13) sendMessage()
}


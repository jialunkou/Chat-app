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
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArZUXyCfBOiIIJxhvw+gg
        GOqxlsvMBpMzdRO52pQkEVmnmvlCJ0VDab0Vkg8f4mTmN6VtFIB53PBHX8a0SqR6
        d5xEeklJCL49Qk3SwTHnfSVIXC8MLcR7cCSGq9J28BgG7xqGJqRU3V0Zg1YCUMal
        EKIn8ykT5JlwJsdo8fAa4mx0aUYrpl8lhGx6U3Lu8IHgbFnqiBGGeDyOZwkB3wN4
        5t20bbinqegin68LHwjTWph+xQrJ1vGNaM9354cPgQ1Dq5V8w9KTVQ4lSLQC8+24
        thlaHkLlS/ZdaNWUhkBmBlA7Q8DMAc5diVHhtPWlymOxRd5uavO+Uo0jWZYSLqWA
        hQIDAQAB
        -----END PUBLIC KEY-----
        `;
    encrypt.setPublicKey(key);
    const Emessage = encrypt.encrypt(message);
    return Emessage
}
function messageDecrypt(Emessage){
    const decrypt = new JSEncrypt();
        const key = `
        -----BEGIN ENCRYPTED PRIVATE KEY-----
        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
        -----END ENCRYPTED PRIVATE KEY-----
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


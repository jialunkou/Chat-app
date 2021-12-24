Chat App Project for Communication Networks course
Server-based chat app coded in nodejs as project for Communication Networks course. Allows encrypted communication between users identifying through an account. Works only on local nework due to lack of free available central server.

Make sure to have Node.js installed as well as the following modules :
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^5.0.0-alpha.8",
    "mongoose": "^6.1.2",
    "node-rsa": "^1.1.1",
    "nodemon": "^2.0.15",
    "socket.io": "^4.4.0"

you could download these modules by using npm install 

nodemon server.js   ---- input this commend ，and start to run Chat App
then you will find the link http://localhost:3001  on Terminal   , Then  Ctrl + click 
a webpage will automatically open , you could try to  open multiple webepage

Features and Stuff
1.Login, register , before login please first to register. 
2.don't forget to choose yuor own avatar when you login!!
3.start private communication by click other users avatar at left user list  
4.when some one join the room or leave the room , there are  two message will be seen at chat room :
notify message'new user join romm 'and notify nessage ' someone leave room'
5.Encryption message , password 

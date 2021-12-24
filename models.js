const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/CP',{

useNewUrlParser: true
})
const UserSchema = new mongoose.Schema({
    username: { type : String, unique: true },
    password: { 
        type : String, 
        set(val){
    
            return require('bcrypt').hashSync(val,10) //10 

        }

    },
    avatar:{ type : String},

})

const User = mongoose.model('user', UserSchema)

User.db.dropCollection('users')

module.exports={ User } 


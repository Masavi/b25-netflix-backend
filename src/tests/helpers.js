require('dotenv/config');
const mongoose =  require('mongoose');

// Por si las flies
process.env.NODE_ENV = "test";
const TEST_DATABASE_URI = `${process.env.TEST_DATABASE_URI}`

const config = {
    db:{
        test: TEST_DATABASE_URI
    },
    connection:null
}


function connect(){
    return new Promise((resolve, reject) => {
        if(config.connection){
            return resolve();
        }

        const mongoUri = TEST_DATABASE_URI

        mongoose.Promise = Promise

        const options =  {
            server:{
                auto_connect:true,
                reconnectTries:Number.MAX_VALUE,
                reconnectInterval:1000
            }

        }

        mongoose.connect(mongoUri,options)

        config.connection = mongoose.connection

        config.connection
                .once("open",resolve)
                .on('error',(e) => {
                    if(e.message.code  === 'ETIMEDOUT'){
                        console.log(e)
                        mongoose.connect(mongoUri,options)
                    }

                    console.log(e)
                    reject(e)  

                })

    })
}

function clearDatabase(){

    return new  Promise(resolve => {

        var count = 0;
        var max =  Object.keys(mongoose.connection.collections).length
        for(const i in mongoose.connection.collections){
            mongoose.connection.collections[i].remove(function(){
                count++;
                if(count >= max){
                    resolve();
                }
            })
        }
    })

}

module.exports =  async function setupTest(){
    await connect()
    await clearDatabase()
}
module.exports = async function(){
   if (global.todoClient) delete global.todoClient
    if(global.todoDB) delete global.todoDB
    console.log(`Teardown mongo connection`)
}
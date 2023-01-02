const express=require('express')
const app=express()
const { proxy, scriptUrl } = require('rtsp-relay')(app);
const mongoose=require('mongoose')
const cameraModel=require("./cameraModel")
async function InitializeDB(){
    try{
       const connection=await mongoose.connect(`mongodb+srv://frshr:frshr@cluster0.cbgwkf8.mongodb.net/?retryWrites=true&w=majority`)
       if(connection){
        console.log(`Database is connected to Host ${connection.connection.host}`)
       }
    }catch(err){
        console.log(err)
    }
}
InitializeDB()

app.get('/api/:id',async(req, res) =>{
  const {id}=req.params
  if(id.length==24){
   const findCamera=await cameraModel.findById(id)
   console.log(findCamera)
if(findCamera)
{
  handler = proxy({
      url: findCamera.streamURL,
      // if your RTSP stream need credentials, include them in the URL as above
     verbose: false,
  });
app.ws(`/api/stream/${id}`, (handler))
res.send(`
<script src='${scriptUrl}'></script>
<style>
canvas{
  width:100%;
  height:100%;
}
</style>
<canvas id='canvas'></canvas>


<script>
  loadPlayer({
    url: 'ws://' + location.host + '/api/stream/${id}',
    canvas: document.getElementById('canvas')
  });
</script>`)
}else{
  res.status(400).json({
    msg:"something wend wrong!"
  })
}
}else{
  res.send("passed string length is not valid")
}
}
   
);


app.listen(5000,()=>{
    console.log("server is listening on 5000")
})
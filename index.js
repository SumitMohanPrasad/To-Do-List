const express=require('express')
const cors=require('cors')
const app=express();

app.use(cors());
app.use(express.json());

let tasks=[];
app.post('/addtask',(req,res)=>{
    console.log("inside post addtask API" ,req.body);
    
    const task={
        id:Date.now(),
        title:req.body.title
    }
    tasks.push(task);
    console.log(tasks)
    res.status(200).json(task)
})
app.get('/task',(req,res)=>{
    console.log("inside get task API")
    res.send(tasks)
})

app.patch('/updateTask/:id',(req,res)=>{
    console.log("inside update /updateTask api",req.params.id);
    const id= req.params.id;
  // const updatedTask = req.body.title;
    for (let i = 0; i<tasks.length; i++) {
      if(tasks[i].id==id){
          tasks[i].text=req.body.updatedTask;
          break;
      }
    
    }
    res.status(200).json({message:"successfully updated a file"})
})


app.delete('/deleteTask/:id',(req,res)=>{
    const id=req.params.id;
   tasks=tasks.filter((task)=>task.id!=id);
//    let newtask=[];
//    for (let i = 0; i < tasks.length; i++) {
//          if(tasks[i].id!=id){
//              newtask.push(tasks[i]);
//          }
       
//    }
    res.status(200).json({message:"successfully deleted a file"})
})
const port=3001;
app.listen(port,()=>{
console.log(`server is running in port ${port}`)
})
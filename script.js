const taskInput=document.getElementById('task-input')
const taskList=document.getElementById('task-list')
renderTaskList();
let tasks=[];

function addTask(){
    const tasktext=taskInput.value;
    if(tasktext!=''){
   // taskInput.value='';
    //console.log(tasktest)
    const task={
         id:Date.now(),
        // text:tasktext
        title: tasktext
    }
    //tasks.push(task);
    axios.post('http://localhost:3001/addtask',task).then((response)=>{
        console.log(response);
        // axios.get('http://localhost:3001/task',task).then((response)=>{

        // }).catch((err)=>{
        //     console.log(err);
        // });
        taskInput.value='';
        renderTaskList()
    }).catch((err)=>{
        console.log(err);
    });
    // console.log(tasks)
    // renderTaskList()
   
    

    
} 
}
// function deleteTask(id){
//     tasks=tasks.filter(task=> task.id!==id)
//     renderTaskList()
// }

function updateTask(id){
    let updatedTask=prompt("please enter updated task");
    const data={
      updatedTask
    }
    axios.patch(`http://localhost:3001/updateTask/${id}`,data).then((response)=>{
        console.log(response);
        renderTaskList();
    }).catch((err)=>{
        console.log(err);
    })
}
function deleteTask(id){
    axios.delete(`http://localhost:3001/deleteTask/${id}`).then((response)=>{
        renderTaskList();
    }).catch((err)=>{
        console.log(err);
    })
} 

function renderTaskList(){
    taskList.innerHTML='';
    axios.get('http://localhost:3001/task').then((response)=>{
         response.data.forEach((task)=>{
             const li =document.createElement("li");
             li.innerHTML=`<span> ${task.title}<span>
             <button onclick="updateTask(${task.id})">update </button>
             <button onclick="deleteTask(${task.id})"> Delete </button>
             `

             taskList.appendChild(li);
         })
        }).catch((err)=>{
            console.log(err);
        });
        
       
    
    // tasks.forEach(task =>{
    //     const listitem=document.createElement('li');
    //     listitem.innerHTML=`
    //     <span>${task.text}</span>
    //     <span>
    //      <button onclick="deleteTask(${task.id})">Delete</button>
    //     <span>
    //     `;
    //     taskList.appendChild(listitem);
    // });
}
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // store tasks in memory
// let tasks = [];

// app.post('/addTask', (req, res) => {
//     console.log('Inside Post /addTask API: ', req.body);
//     const title = req.body.title;
//     const task = {
//         id: Date.now(),
//         title
//     }
//     tasks.push(task);
//     console.log(tasks);
//     res.status(200).json(task);
// })

// // get api
// app.get('/getTasks', (req, res) => {
//     console.log('Inside Get /getTasks API: ', tasks);
//     res.json(tasks);
// })

// const port = 3000;
// app.listen(port, () => {
//     console.log(`server is running in port no ${port}`);
// })
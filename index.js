const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// -----Middleware setup-----------
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));  // For read data of  submit data
app.set('view engine','ejs');


// -------Home Page Shows Tasks ----------
let tasks = [{id:1,name:'Task1'},{id:2,name:'Task2'}];
app.get('/',(req,res)=>{
    res.render('index',{tasks, editTask: null});
});
// -------Add Tasks ----------
app.post('/add-task',(req,res)=>{
    let newTask = {
        id:Date.now(),
        name:req.body.task
    }
    tasks.push(newTask);
    res.redirect('/');
});
// --------Edit Task-------
app.get('/edit/:id',(req,res)=>{
    const taskId = Number(req.params.id);
   const taskToEdit =tasks.find(task=> task.id===taskId);
        res.render('index',{tasks,editTask:taskToEdit})
    
});


// -----Update Task------------
app.post('/edit-task/:id',(req,res)=>{
 const taskId= Number(req.params.id);
 const taskName = req.body.task;
 tasks = tasks.map(t => t.id === taskId ? { id:taskId, name: taskName } : t);
    res.redirect('/');
});

// ------Delete Task-------
app.post('/delete-task/:id',(req,res)=>{
    const taskId = Number(req.params.id);
    tasks=tasks.filter(task=>task.id !== taskId);
    res.redirect('/')
})



// --------Execute Server--------
app.listen(port,()=>console.log('Server is running!'))
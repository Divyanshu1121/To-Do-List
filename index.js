const express = require('express');
const port = 8081;
const app = express();

app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
    res.render('task', {
        tasks
    })
})

app.post('/add', (req, res) => {
    let { taskName, deadline } = req.body;
    tasks.push({ taskName, deadline });
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const taskName = req.body.taskName;
    tasks = tasks.filter(task => task.taskName !== taskName);
    res.redirect('/');
});

app.post('/edit', (req, res) => {
    const { originalTaskName, taskName, deadline } = req.body;
    tasks = tasks.map(task => {
        if (task.taskName === originalTaskName) {
            return { taskName, deadline };
        }
        return task;
    });
    res.redirect('/');
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Started on http://localhost:" + port);
    }
})

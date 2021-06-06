const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/todos', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.pw);
    res.end(`Your id is ${req.body.id} and PW is ${req.body.pw}`);
})

app.listen(9100, () => {
    console.log('Server is running');
});


const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');

const app = express();

connectDB();

app.use(cors())

app.use(express.json({ extend: true }))

const port = process.env.PORT || 4000;

app.use('/api/user', require('./routes/users.routes.js'));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/project', require('./routes/projects.routes.js'));
app.use('/api/task', require('./routes/tasks.routes.js'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`)
})
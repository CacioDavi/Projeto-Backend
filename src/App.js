import express from'express';
import { GetUser } from './controllers/UserController.js';
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.type('aplication/json')
  res.json({
    title: "Here is running a API",
    description: "access my resources"
  })
})

app.route("/v1/users/:id")
.get(GetUser)

export default app;
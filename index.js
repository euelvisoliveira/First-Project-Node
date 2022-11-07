const express = require('express')
const uuid = require('uuid') //biblioteca para criar um id unico

const port = 3000
const app = express()
app.use(express.json())

/*
  - GET           => Buscar informação no back-end
  - POST          => Criar informação no back-end
  - PUT / PATH    => ALterar/Atualizar informação no back-end
  - Delete        => Deletar informação no back-end

  - Middleware    => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/

const users = [] // nunca iremos usar com var foi so um metodo didatico

const checkUserId = (request, response, next) => {
  const { id } = request.params

  const index = users.findIndex((user) => user.id === id)

  if (index < 0) {
    return response.status(404).json({ message: 'User not Fount' })
  }

  request.userIndex = index
  request.userId = id

  next()
}

// Route Get
app.get('/users', (request, response) => {
  return response.json(users)
})

// Route Post
app.post('/users/', (request, response) => {
  const { name, age } = request.body

  const user = { id: uuid.v4(), name, age }

  users.push(user)

  return response.status(201).json(user)
})

// Route Put/Path
app.put('/users/:id', checkUserId, (request, response) => {
  const { name, age } = request.body
  const index = request.userIndex
  const id = request.userId

  const updateUser = { id, name, age }

  console.log(index)

  users[index] = updateUser

  return response.json(updateUser)
})

// Route Delete
app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex

  users.splice(index, 1)

  return response.status(204).json(users)
})

app.listen(port, () => {
  console.log(`🚀 Serve started on port ${port}`)
})

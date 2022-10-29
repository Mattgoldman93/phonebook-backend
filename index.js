const express = require('express');

const app = express().use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const date_time = () => new Date();

app.get('/info', (request, response) => {
  response.send(
    `<div><p>Phonebook has info for ${
      persons.length
    } people<p><p>${date_time().toString()}</p></div>`,
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    return response.status(404).json({
      error: `A Person was not found for ID: ${id}`,
    });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'You must specify both a name and number.',
    });
  }

  if (persons.map((p) => p.name).includes(body.name)) {
    return response.status(409).json({
      error: `an entry for ${body.name} already exists.`,
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 1000),
  };

  persons = persons.concat(person);
  console.log(persons);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

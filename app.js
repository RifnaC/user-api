const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const id = parseInt(parsedUrl.searchParams.get('id'));

  if (method === 'GET' && pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } 
  else if (method === 'GET' && pathname === '/api/user') {
      const userById = users.find(user => user.userId === id);
    if (userById) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(userById));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User with id ${id} not found`);
    }
  } else if (method === 'POST' && pathname === '/api/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newUser = JSON.parse(body);
      newUser.userId = users.length + 1; 
      users.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } 
  else if (method === 'PUT' && pathname === '/api/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const updatedUser = JSON.parse(body);
      const userIndex = users.findIndex(user => user.userId === id);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users[userIndex]));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`User with id ${id} not found`);
      }
    });
  } 
  else if (method === 'DELETE' && pathname === '/api/users') {
    const userIndex = users.findIndex(user => user.userId === id);

    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedUser));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User with id ${id} not found`);
    }
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

let users = [
  {
    userId: 1,
    firstName: "Afaf",
    lastName: 'Afi',
    Email: 'afaf@21gmail.com'
  },
  {
    userId: 2,
    firstName: "Jeeva",
    lastName: 'MK',
    Email: 'jeeva@21gmail.com'
  }
];

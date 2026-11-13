# week2-node-express

Express API for the Week 2 assignment.

## Run
```
npm install
npm start
```
Server runs on the PORT set in `.env` (default 3000).

## Test with curl
```
curl http://localhost:3000/
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Patrick","email":"p@example.com"}'
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Patrick"}'
curl http://localhost:3000/user/5
```

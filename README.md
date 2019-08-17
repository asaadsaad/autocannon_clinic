#autocannon#  
**Sending GET and read from MongoDB**  
`autocannon -c 10 -d 5 localhost:3000`    

**Sending POST request with Body and Insert doc in MongoDB**  
`autocannon -c 2 -d 1 --headers content-type="application/json" --input "data.json" --method POST http://localhost:3000`  
  
**Generating Tokens**  
`autocannon -c 10 -d 5 http://localhost:3000/getToken`  
  
**Sending POST request**  
`autocannon -c 10 -d 5 --headers authorization="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNhYWQgU2FhZCIsImlhdCI6MTU2NjA2MDk5NX0.G6kKZ3jr6tjHf-fMLF95950TnoCmFxLtdgnHPfAl7i4" --headers content-type="application/json" --input "data.json" --method POST http://localhost:3000/verifyToken`  
  
  
#Analyzing Results#  
##Clinic Doctor##  
`clinic doctor --on-port 'autocannon -c 10 -d 5 localhost:$PORT' -- node server.js`  
`clinic doctor --on-port 'autocannon -c 10 -d 5 http://localhost:$PORT/getToken' -- node server.js`  
  
##Clinic bubbleprof##  
`clinic bubbleprof --on-port 'autocannon -c 10 -d 5 http://localhost:$PORT/getToken' -- node server.js`  
  
##Clinic flame##  
`clinic flame --on-port 'autocannon -c 10 -d 5 http://localhost:$PORT/getToken' -- node server.js`  
  
`clinic doctor --on-port 'autocannon -c 2 -d 5 --headers content-type="application/json" --input "data.json" --method POST http://localhost:$PORT' -- node server.js`  
`clinic bubbleprof --on-port 'autocannon -c 2 -d 5 --headers content-type="application/json" --input "data.json" --method POST http://localhost:$PORT' -- node server.js`  
   
  

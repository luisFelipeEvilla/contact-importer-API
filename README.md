# contact-importer

## Technologies

* NodeJS
* Docker
* ExpressJs
* Postgres
* jwt
* swagger

## Documentations
This API use swagger for auto generate documentation. 

You can read the documentation on the endpoint **/doc**. For example if you the API allocated on your machine on port 4000, you can search http/localhost:4000/doc to see the documentation.

<img src="/assets/documentation.png" alt="documentation page" style="height: 500px; width:500px;"/>
## enviroment variables
`
DB_USER=docker // data base user
DB_PASSWORD=PASS // data base passsword
DB_PORT=5432 // data base port
DB_NAME=docker // data base name
SERVER_PORT=4000 // server listen port
ENCRYPTION_PASSWORD=FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs // credit card encryption password
`
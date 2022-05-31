# contact-importer
Restful API to save contacts from CSV File

## Technologies

* NodeJS
* Docker
* ExpressJs
* Postgres
* jwt
* swagger

## Getting Started
Copy the repository on your local machine:

`git clone https://github.com/luisFelipeEvilla/contact-importer-contact-uploader.git`

### enviroment variables
You can set enviroment variables for the project and  change the default settings. Here you have a example with the defaults values to deploy the API. Create a .env file in your project root and copy there.

`
DB_USER=docker // data base user
DB_PASSWORD=PASS // data base passsword
DB_PORT=5432 // data base port
DB_NAME=docker // data base name
SERVER_PORT=4000 // server listen port
ENCRYPTION_PASSWORD=FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs // credit card encryption password
`

### Deployment
You can easy deploy the complete application with docker compose. execute the following command on your project root directory

`docker compose up`

This will create the following three container.

1. data base container: this contains a postgres sql database
2. api container: this contain the project api service(this repository)
3. contact-uploader contaier: this it's backgroud job to upload contacts. see: [contact uploader](https://github.com/luisFelipeEvilla/contact-importer-contact-uploader)

## Documentations
This API use swagger for auto generate documentation. 

You can read the documentation on the endpoint **/doc**. For example if you the API allocated on your machine on port 4000, you can search http/localhost:4000/doc to see the documentation.

<img src="/assets/documentation.png" alt="documentation page" style="width: 100%;"/>

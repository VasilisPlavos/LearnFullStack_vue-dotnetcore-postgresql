# LearnFullStack_vue-dotnetcore-postgresql
Udemy course: Learn Full-Stack Vue, .NET Core, PostgreSQL Web Development ([source](https://www.udemy.com/course/learn-full-stack-vue-net-core-postgres))

## Development Environment Setup
* PostgreSQL ([information](https://www.postgresql.org/download/))
* .Net Core SDK ([source](https://dotnet.microsoft.com/download))
* Vue CLI

## Projects created
* VUE project
* sln: dotnet solution file to connect everything (?)
* SolarCoffee.Web (webapi) > Like VS > New project > template "ASP.NET Core Web API"
* Other class libraries

## Other class libraries
* dotnet new classlib -f netcoreapp3.1 -o SolarCoffee.Data *(netcoreapp3.1 because i am in version 3.1)*
* dotnet new classlib -f netcoreapp3.1 -o SolarCoffee.Services
* dotnet new xunit -f netcoreapp3.1 -o SolarCoffee.Test

## Postgresql
Server [localhost]
Database [postgres]
Port [5432]
Username [postgres]
Password for user postgres: ****
```
postgres=# CREATE USER solardev WITH PASSWORD 'solar123';
CREATE ROLE
postgres=# CREATE DATABASE solardev;
CREATE DATABASE
postgres=# GRANT ALL PRIVILEGES ON DATABASE solardev TO solardev;
GRANT
postgres=# \c solardev solardev (connecting to solardev database as solardev username)
```

## Other Postgre commands
` \c [database] [user] `: connects to the [database] as [user]
` \dt `: show all datatables of a database
` SELECT * FROM "CustomerAddresses"; ` Query sample
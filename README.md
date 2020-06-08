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

## How to run
1. Create user, pass, database based on SolarCoffee.Web > appsettings.json > appsettings.Development.json

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

## Other Postgresql commands
` \c [database] [user] `: connects to the [database] as [user]
` \dt `: show all datatables of a database
` SELECT * FROM "CustomerAddresses"; ` Query sample
` psql -h localhost -p 5432 -d solardev -U solardev ` quick connect

### Migrations cheatsheet
` dotnet ef --startup-project ../SolarCoffee.Web migrations add InitialMigration ` in SolarCoffee\SolarCoffee.Data dir
` dotnet ef --startup-project ../SolarCoffee.Web database update ` in SolarCoffee\SolarCoffee.Data dir

### Makefile cheatsheet
` make migrations mname=ProductInventorySales ` ***Tip:** How to run make on Windows ([source](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows))*

# Vuejs
## Methods to remember
1. mounted(){}
2. created(){}
3. destroy(){} => when component destroyed (ex. change from home to about)
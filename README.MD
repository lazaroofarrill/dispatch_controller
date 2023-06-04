# Air Drone Dispatch Controller

## Basic setup

The project will not start without the proper environment variables set
The fastest way of setting them up is creating a file `.env`
in the root of the project and copying the contents of the file
`.env.example` in it.

The variable MINIO_HOST must resolve to a public url.
For testing locally use an alias and add this alias
the list of hosts in the system.


## Running directly from the container

To start the project right away run the following command in the terminal.

`docker compose up api`

To start battery level job run the following command.

`docker compose up job_battery_check`

## Local development

### Installing dependencies

The package manager used is Yarn.
The project requires Node 18.

To install the project dependencies run the following
command.

`yarn install -D`

### Rolling up dependencies

Fastest way of getting the project up is using
docker compose.
The project uses PostgresSQL for storing the data
and logs.
Images are stored in an S3-Compatible Minio
instance.
Run the following command for starting
necessary services.

`docker compose up db minio`

### Running tests

For running the tests run the following commands.
The tests include end-to-end test so in order to
pass you will also need the test database.
Run the following command.

`docker compose up db-test minio`

`yarn test`

## Api docs

You can access the swagger description in the
endpoint `/docs`.

# 4IT580: Backend

## Local Installation

Run `yarn install` in root folder of the monorepo:

```bash
cd ..
yarn install
cd backend
```

## Setup Environment Variables

```bash
cp ./.env ./.env.local
```

Edit `.env.local` file (DB user, password, ...)

## Run Development Server

```bash
yarn dev
```

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Migrate and seed the database

Run the following script:

```bash
yarn db:migrate
```

This will create the database and the tables.

```bash
yarn db:seed
```

This will seed the database with some basic data.

The database schema can be found in [`./db/schema.ts`](./db/schema.ts). Whenver you make changes here, run `yarn db:migrations:generate` which will generate a migration file in `./drizzle` and then you can run `yarn db:migrate` to apply the migrations to the database.

## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

### Build Production and Watch for Changes

```bash
yarn build-watch
```

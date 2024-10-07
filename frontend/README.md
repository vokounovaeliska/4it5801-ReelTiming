# 4IT580: Frontend

This app was created using [Vite](https://vitejs.dev/).

## Local Installation

Run `yarn install` in root folder of the monorepo:

```bash
cd ..
yarn install
cd frontend
```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Edit ENV Variables

Create `./.env.local` inspired by [`./.env`](./.env).

Any variable defined in `.env.local` has priority over `.env`.

Any custom ENV variable that should be accessible in frontend needs an `VITE_` prefix (this is for security).

More about [ENV variables in Vite documentation](https://vitejs.dev/guide/env-and-mode)

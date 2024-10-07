#!/usr/bin/env node
import 'dotenv-flow/config';

import fs from 'fs';
import {
  buildClientSchema,
  getIntrospectionQuery,
  lexicographicSortSchema,
  printSchema,
} from 'graphql';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VITE_GRAPHQL_API = process.env.VITE_GRAPHQL_API;
const SCHEMA_FILE_PATH = path.resolve(__dirname, '../schema.graphql');

if (!VITE_GRAPHQL_API) {
  console.error('error: `VITE_GRAPHQL_API` env variable not defined');
  process.exit(1);
}

async function saveSchema(endpoint, filename) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const graphqlSchemaObj = buildClientSchema((await response.json()).data);
  const sortedSchema = lexicographicSortSchema(graphqlSchemaObj);
  const sdlString = printSchema(sortedSchema);
  fs.writeFileSync(filename, sdlString);
}

async function main() {
  console.log('⌛ Downloading GraphQL schema...');
  await saveSchema(VITE_GRAPHQL_API, SCHEMA_FILE_PATH);
  console.log('✅ GraphQL schema downloaded.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

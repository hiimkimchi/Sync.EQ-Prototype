# Sync.EQ - Equalize Your Connections
Quarter Long Project for CPSC 5240

## Prerequisites needed
- NodeJS

## To run the Node/Express Backend 
```
cd backend
npm install
npm run dev
```

## env vars
```
MONGO_URL
PORT
ISSUER_URL
FRONTEND
API_URL
AZURE_STORAGE_CONN_STRING
```
### NOTE: your .env file should be in /backend

## To run the Angular Frontend

### Run App
```
cd frontend
npm install
npm run start
```

## environment.ts vars
```
export interface EnvConfig {
    apiUrl: string;
    auth0Domain: string;
    auth0ClientId: string;
}
```
### NOTE: your environment.ts should be in /frontend/src/app/core
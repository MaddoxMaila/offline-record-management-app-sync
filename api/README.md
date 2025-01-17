# API

## Tech Stack
 * NodeJS 
 * TypeScript
 * ExpressJS
 * Prisma with PostgreSQL (Should be but because of PC constraints, im using SQLite but with prisma to replace a DB you just the schema.prisma file to use any client of your liking)

___
```javascript
/**
 * @design Tshepang Maila
 * @implementation Tshepang Maila
 */
```
## Constraints

I had a few constraints PC wise, my personal PC got damaged so I was using my work PC which is locked and cant install softwares as I wish.

I'm locked to Node v22.x because of other projects I'm working on and that doesn't play nice with prisma v6.x, had to downgrade Prisma until i find one that works with my Version of Node, which is Prisma v2.30.2 somehow... But still that raises "End of json input" when submitting forms because it is not fully compatible with Node v22.x

## Deployments

 scripts in package.json
```json
"scripts": {
    "build": "rm -r dist/* &&  tsc",
    "p-init": "prisma init",
    "p-mg": "prisma migrate dev --name init && prisma generate",
    "p-generate": "prisma generate",
    "dev": "nodemon server.ts"
  },

```

## How To Build & Run

Would have loved to use docker-compose for the two services but because of time was not able to achieve that.

### 1 Create Database

- Make sure you have a .env file in the project root
```
PORT=2828
DATABASE_URL=""
BASE_URL="/api/v1"
```
- Then run the following command to spin up a postgres container
```
$ docker-compose up --build
```

### 2 Build & Run Server

- Install node packages
  ```
  $ npm install
  ```
- To migrate prisma db schemas to PostgreSQL & generate db objects
  ```
  $ npm run p-mg
  ```

- Build typescipt project
  ```
  $ npm run build
  ```

- If everything worked perfect, Run server
  ```
  $ npm run start
  ```


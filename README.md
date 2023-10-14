# StreamLine
<img src="assets/icons/node-js-svgrepo-com.svg" alt="nodejs" width="30" height="30">
<img src="assets/icons/yarn-svgrepo-com.svg" alt="yarn" width="30" height="30">
<img src="assets/icons/nestjs-svgrepo-com.svg" alt="nestjs" width="30" height="30">
<img src="assets/icons/typescript-icon-svgrepo-com.svg" alt="typescript" width="30" height="30">
<img src="assets/icons/graphql-svgrepo-com.svg" alt="graphql" width="30" height="30">
<img src="assets/icons/nextjs-fill-svgrepo-com.svg" alt="nextjs" width="30" height="30">
<img src="assets/icons/postgresql-svgrepo-com.svg" alt="postgres" width="30" height="30">
<img src="assets/icons/react-svgrepo-com.svg" alt="react" width="30" height="30">
<img src="assets/icons/tailwind-svgrepo-com.svg" alt="tailwind" width="30" height="30">
<img src="assets/icons/apollographql-svgrepo-com.svg" alt="apollo" width="30" height="30">  
<br>
<br>

This comprehensive solution is designed to streamline and optimize your business processes, providing a centralized platform to manage and coordinate various aspects of your enterprise. Whether you are a small business or a large corporation, our ERP software is tailored to meet your organizational needs and enhance overall efficiency.

![System Acrchitecture](assets/system%20architecture.png)

### Modules under development
1. Asset Server
2. User Authentication and Authorization
3. Procurement
4. Accounts Branch
6. Customer Relations Management
7. Transport

<br>

## Setup the development server

**Install Dependencies and Setup Project**
```
# step 1: clone repo
git clone https://github.com/Web-Woods/streamline-procurement.git

# step 2: go to project directory and run
yarn install

# step 3: go to backend directory and run
yarn install

# step 4: go to fronend directory and run
yarn install
```

**Database Configurations**
Add database configurations in the `backend\libs\core\src\config\orm.config.ts` file.
![ORM Config](assets/ormconfig.png)

**Run the Application**
Run the application using the following commands.
```
# go to backend folder and run
yarn start:dev streamline

# go to frontend folder and run
yarn dev:new
```

## Test the applications in dev mode
Frontend app starts on `http://localhost:3000`  
Backend app starts on `http://localhost:3333/graphql`  
Use a graphql client like **Altair** or use hte playgorund on `http://localhost:3333/graphql/playground`





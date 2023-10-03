
# streamline-procurement

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
Add database configurations in the `backend\src\common\config\ormconfig.ts` file.
```
const commonConfig: DataSourceOptions = {
    // more config here
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5342,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'streamline',
    // more config here
  };
```
**Run the Application**
Run the application using the following commands.
```
# go to backend folder and run
yarn start:dev

# go to frontend folder and run
yarn dev:new
```

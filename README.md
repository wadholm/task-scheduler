# Task Scheduler

This repo is built as a part of the course "Individuellt programvaruprojekt" at BTH.

## Frontend

### The task-scheduler web app is available at:
https://task-scheduler-frontend.herokuapp.com/

### Available Scripts

In the frontend directory, you can run:

```
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
npm run build
```
Bundles the app into static files for production.

## Backend

### REST-API is available at:
https://task-scheduler-backend.herokuapp.com/

### users

A user has the following attributes:
```
_id
name
email
password
```
### tasks

A task has the following attributes:
```
_id
user_id
ref
description
category
state
start_time
deadline
est_duration
act_duration
```

### Available Scripts

In the backend directory, you can run:

```
npm start
```

Runs the app in the development mode.  
Open [http://localhost:1337](http://localhost:1337) to view it in the browser.

You will also see any lint errors in the console.

```
npm run watch
```

Runs the app in the development mode.  
The page will reload if you make edits.  
You will also see any lint errors in the console.

```
npm run production
```

Runs the app in the production mode.  

```
npm run test
```

Runs the test suite.  



# Hire-me app

This project is set up using create-react-app and Yarn as a package manager.

## Setting up environment variables
Before you start the project, a setup of environment variables is required. There is an `.env.example` file in this repo. Just rename it to `.env` and everything will be set up for you.

## Starting the project
Before you start the project, you need to install dependencies using the following command:

```
yarn
```

After that, you can run `yarn start` and a development server will be started for you.

## Core libraries

This project uses Material-UI for design components because it offers everything it needs out of the box. 
Additionally, it uses date-fns for date formatting because it is very lightweight unlike other solutions like moment or luxon.

For the API calls it uses react-query in combination with axios. Because it doesn't rely heavily on local state, react-query offers significant benefits over Redux, for example.

Pagination is implemented using Material-UI `TablePagination` component.
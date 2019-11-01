# How to use this Application

The deployed application can be found here: `https://shopping-kumpel.herokuapp.com/`
You can also clone the repo to run the app locally. Please install all the dependencies and use the following to run the application: 
`npm run dev` to run the application
`npm run test-server` to run the tester server and then `npm test` to run all test suites. 

# The initial problem that the app solves

The idea for the app was that there are a lot of shopping list apps already but usually they do not allow you to collaborate with your friends. 
Hence, Shopping Kumpel has been created to allow you to work on a shopping list with friends in real time. All logged in users will immediately see all the actions other users perform.

The app allows you to: 
* create new items
* cross items off the list by clicking on them 
* editing items by clicking the pen icon
* deleting items by clicking the x icon

Each user will always see the updated list on his device. Hence, multiple people can collect items from the supermarket without the risk of buying the same thing twice. 

# Technical choices

The app was built with React in the Frontend and Node / Express in the Backend. This allowed for only JavaScript being used in both Front- and Backend.
Sequelize is being used to communicate with the Postgres Database. Again, allowing to use JavaScript which is being translated into SQL by Sequelize.
In order to make the application real-time socket.io has been used which is a library to implement web sockets. 

# Todos in the future

The application is a very early version. To be done are amongst other things the following ones: 
* Most importantly, user specific lists and the possibility for users to connect and work on lists together
* Refactoring of code
* Extending functionality 

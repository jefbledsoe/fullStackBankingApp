# MERN Stack Banking App

## Description

![alt text](https://res.cloudinary.com/dquenlu8q/image/upload/v1690384707/homeImg_yifded.png)

This is a full stack banking application built using the MERN stack and authentication is handled with auth0. It allows users to create accounts, deposit and withdraw money, and view their transaction history. The application is deployed on Heroku and can be accessed [here](https://mern-banking-app.herokuapp.com/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Future Edits](#Future-Edits)
- [Questions](#questions)

## Installation

To install the application, clone the repository and run `npm install` to install the dependencies. Then, run `npm start` to start the application.

## Usage

The application can be accessed [here](https://mern-banking-app.herokuapp.com/). To create an account, click the "Create Account" button on the home page. Then, enter a username and password and click "Create Account". To log in, enter your username and password and click "Log In". Once logged in, you can deposit and withdraw money from your account. To deposit money, enter the amount you would like to deposit and click "Deposit". To withdraw money, enter the amount you would like to withdraw and click "Withdraw". To view your transaction history, click the "Transaction History" button. To log out, click the "Log Out" button.

For local usage of the application, the application can be accessed at http://localhost:9000. To use the application locally, you will need to create a .env file in front and bank end folders. The .envs files should contain the following information:

_ in the banking-back-end folder create a .env file with the following information:

__ MONGO_URI= your mongoDB connection string

_in the banking-front-end folder create a .env file with the following information:

__ REACT_APP_AUTH0_DOMAIN= your auth0 domain

__REACT_APP_AUTH0_CLIENT_ID= your auth0 client id

## License

This project was developed as an assignment for the MIT xPRO Full Stack Development with MERN bootcamp. Most of the structure for the project was guided by the bootcamp. The code for the application, the specific technologies used, and the styling were developed by and or implemented by me.

This application is covered under the MIT license.

## Future Edits

- Add a feature to allow users to transfer money between accounts
- Add a feature to allow users to delete their accounts
- Add a feature to allow users to edit their account information
- Add a feature for admin users to edit and delete user accounts

## Questions

If you have any questions, please feel free to contact me.

GitHub: [Jeff Bledsoe](https://github.com/jefbledsoe)
Email: [Jeff Bledsoe](mailto: jefbleds@outlook.com)

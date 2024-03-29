# Online Gadget Store
`Version: 2.1`

This project is a practice endeavor aimed at learning and mastering the Node.js, Express.js, MySQL and EJS Template Engine stack. It simulates an online store dedicated to selling electronic products.

## Features

- Browse through a variety of electronic products.
- Add/Edit/Remove products.
- Add/Remove products to the shopping cart.
- Seamless user interface with EJS templates.

## Tech Stack

- Node.js
- Express.js
- EJS Template Engine
- MySQL with the use of Sequelize ORM package.

## Usage

1. Clone the repository:
[https://github.com/mr-shan/practice-node-first-express-app.git](https://github.com/mr-shan/practice-node-first-express-app.git)


2. Navigate to the project directory: `practice-node-first-express-app`

3. Install dependencies: `npm install`

4. This project uses MySQL for storing data. You need to configure it's details in `tools/database.js` file in order to make connection. Read data management for more details on how to connect to DB.

5. Run the application: `npm start`

6. Open your web browser and go to [localhost:3000](`http://localhost:3000`) to view the application.

## Data Management

- This project uses MySQL for storing data.
- It's managed by Sequelize ORM package. So you need to create the database before you proceed.
- Put the details of MySQL (username, password, and name of database.) in `tools/database.js` before you run the project.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

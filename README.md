This application is a product management system that allows users to perform various operations on products. The following functions have been implemented:

       Table: Displays a table with a list of products. Each row in the table represents a product and contains the product name, quantity, size, weight, delete button, edit button, and details button.

       Removal: Users can remove a product by clicking the "Remove" button in the appropriate row of the table. This will remove the product from your system.

       Editing: Users can edit a product by clicking the "Edit" button in the corresponding row of the table. This opens a modal form where users can change product details such as name, quantity, size and weight. Changes made to the product are saved after the form is submitted.

       Create: Users can add a new product by clicking the Add Product button above the table. This opens a modal form where users can enter new product details, including name, quantity, size and weight. After submitting the form, the new product is added to the system and displayed in the table.

       View details with comments: Users can view product details, including product name, quantity, size, and weight. In addition, the product information section contains a list of comments related to the product. Each comment includes a description and date. Users can add new product comments by typing the comment in the provided text area and submitting it. (The functionality was also implemented using redax, but was not used due to lack of time and due to an unresolved error)

To run the application locally, follow these steps:
git clone <repository-url>

Install the required dependencies.
npm install

Start the JSON server to provide a mock API.
json-server --watch db.json --port 3001

    npm start

    Open your browser and visit http://localhost:3000 to access the product management system.

Please ensure that you have Node.js and npm (Node Package Manager) installed on your machine before running the above commands.

Note: The json-server command is used to run a local JSON server that serves the product and comment data from the db.json file. This is a mock API for demonstration purposes.

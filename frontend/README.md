## Setup Instructions

### Install Node.js and npm

Make sure you have `nvm` installed. You can find installation instructions [here](https://github.com/nvm-sh/nvm#install--update-script).

### Using the Correct Node.js and npm Versions

1. Navigate to the project directory.
2. Run the following command to use the correct Node.js version:

   ```sh
   nvm use
   ```

3. If the correct Node.js version is not installed, you can install it using:

   ```sh
   nvm install
   ```

4. Install project dependencies:

   ```sh
   npm install
   ```

5. If you encounter issues, make sure you have the correct Node.js and npm versions:

   ```sh
   node --version
   npm --version
   ```

6. Finally run

   ```sh
   npm run postinstall
   ```

   Message to know if install was successful: `Node.js and npm versions are correct.`

#

#

## FOR TESTING DO THIS:

1. don't run `npm start` but run the following command:
   ```sh
   npm start-dev-server
   ```
2. Then run
   ```sh
   npm run cypress:open
   ```
3. Then you will come in the development build of the project and run the following command
   ```sh
   npm cypress run
   ```
4. The run this to get the report or simply open index.html from the coverage folder
   ```sh
   npx nyc report
   ```

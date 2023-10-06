# madness starter app

To utilize these files, create your own React application using the standard tool invocation of:

% create-react-app madness

# Copy my src folder and overwrite the original folder

# Runs the App

In the project directory, you can run: \

% npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Tests the App

Pleae run:

% npm install canvas

Then you can run: /br
`npm test -- --coverage` to see the percentage of coverage \
Sometimes, you maybe need to run: \
`npm test --coverage --watchAll=false` \
or `($env:CI = "true") -and (npm test)` \
If the coverage table doesn't show and there are some words like "No tests found related to files changed since last commit",
please just modify "App.test.js" , even adding an empty line, it will trigger the test on the whole file.

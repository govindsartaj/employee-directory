# Hypothetical Large Multinational Company Employee Directory

![screenshot of application](https://user-images.githubusercontent.com/22091405/147377709-e85effcb-9d6e-4a7a-8444-1d10f793d26a.png)

## Features
1. Add, Edit and Delete employees
2. Search by any field
3. Filter by Country and Department
4. Sort by Name, Job Title and Department
5. Paginated list
6. Ability to share an employee's information page using their unique link (http://localhost/:employeeId)
7. Sources raw data from https://randomuser.me

## Setup instructions
### Getting started
To set up this application locally, clone the repository, navigate to the client and server directories individually and install all dependencies like so:
```bash
git clone https://github.com/govindsartaj/employee-directory.git
cd employee-directory/client
npm i
cd ../server
npm i
```

### Starting the backend server and client
To start the backend server, open a new terminal, navigate to the ``server`` directory and run ``npm start``. Similarly, to start the client, in a new terminal, navigate to the ``client`` directory and run ``npm start``. By default the backend server will run on port 8000, and the client will run on port 3000.

### Viewing the application
Once both the backend server and client servers have been started, navigate to http://localhost:3000 to view the application.


## Notes on development
### Technologies used:

**Backend** (TypeScript):
* Node
* Express
* **Testing**: Jest
	
**Frontend** (TypeScript):
* React
* React-router-dom
* MaterialUI
* TailwindCSS
* **Testing**: Jest, testing-library

### Some potential improvements
* **Serverless architecture**: Assuming this application is for some large multinational company, we would expect the application to be accessed from all around the world. So, in order to maintain the application's speed and reliablility for users in various geographical locations, we could use a location-based, serverless pattern.
* **Image CDN**: The application would ideally support employee profile image upload, and possibly use a CDN to fetch them quickly and reliably.
* **More comprehensive testing**: I would have liked to write more comprehensive tests, specifically some end-to-end tests.
* **Better Input validation**: The application could most definitely use better input validation. Currently, I can save numbers in the field, and alphabetic characters in the phone number field.
* **Debounce search field input to reduce API calls**: This means that a search request will only be made once the user stops typing, thereby reducing the number of API calls.
* **Use an actual database**: This is rather obvious; instead of storing a large array in memory on the backend to mock a DB, we would use a real database, perhaps something like MongoDB, so that filtering, sorting and searching data will be easier to implement and maintain. Also this way, if the backend is down, our data can still be accessed!
* **Better error handling with messages to the user**: Currently, the user does not get notified when an employee is successfully added (the "Results" count simply increments). If for some reason the employee does not get added, the user is not notified. We can send both success and failure message to the user using something like [react-toastify](https://fkhadra.github.io/react-toastify/api/toast/).
* **Avoid MaterialUI**: While MaterialUI is very quick to set up and use to build something, it is not lightweight by any means. All those unused props can make the application slow, especially when components are re-rendered frequently. To maximize performance, I would write as many components from scratch with custom CSS as possible.
* **Not using create-react-app**: Similar to the reasoning for avoiding MaterialUI, while create-react-app is a great way to get started quickly, we would probably want to avoid it because of all the bulk that comes along with it.
* **Defining more types**: I would have loved to define more types, so that we can use TypeScript to its fullest extent.
* **Smarter searching**: Currently the search function uses String.includes() to get results. I would have loved to implement some sort of fuzzy search which would return partial matches too.

### Misc. Notes
* Raw data was sourced from https://randomuser.me, but was cleaned up to only include fields that might be included in an employee directory. Further, because https://randomuser.me did not contain any employment data, I used [faker.js](https://github.com/marak/Faker.js/) to generate some fake job data for each employee. The data fetching and cleaning is all done when the backend server is started.
* Creating the two-pane UI was definitely a challenge, but I'm happy that this means the user can view one employee's data while browsing through other employees in the list (even while moving to a different page).
* TailwindCSS is cool

This project was incredibly interesting to build, and I had a lot of fun!

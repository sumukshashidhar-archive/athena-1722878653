
# Athena V0.1

If you're a student in India, you've probably had struggles with consolidating your achievements and awards and finding events that you can attend, based on your interests. 

By this project, we hope to create a space for budding young minds in order to get as much exposure as possible and to also provide them with a space where they can consolidate their achievements. 

If you have any concerns or have any suggestions as to how we can do better, do let us know at 
developersatathena@gmail.com 

or reach out to me personally at 

sumuk.work@gmail.com
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them. 

- You will need Angular 8
-  Node.js and express js
- Mongo [Only needs to be installed for developmental purposes]

```
npm install -g @angular/cli
npm install express

```

### Installing

1. Open two different terminals
2. Navigate to the frontend folder in one terminal, and the backend folder in another terminal 
3. In the frontend terminal, run the following commands

```
npm install
ng serve

```

Do not worry if either of the commands take some time, it is absolutely okay. 
	4. Then, in the terminal where the backend folder is open run the following commands

```
npm install
node app.js

```

In the first terminal, you should have an output saying that the project has successfully compiled and is being run on localhost:4200

On the second terminal, you should have an output saying that the server has started

-   [Angular 8]([https://angular.io/](https://angular.io/))  - The web framework used
- [Node.js]([[https://nodejs.org/en/](https://nodejs.org/en/)) - Backend Infrastructure
-   [Express.js]([https://expressjs.com/](https://expressjs.com/)) - Backend Infrastructure
-   [Mongo DB]([https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))  - Database

## Authors



- **Sumuk Shashidhar**  - 
1. Login
2. Signup
3. Home Page and Dashboard
4. Achievements Initial Posting
5. Events 
6. DaVinci Recommendation System
7. Reset password, except NODEMAILER
8. Searching for Users and Events and all that
9. JWT sessions management and Authentication
10. API Key Signatory and Verification Process
11. Admin Console set up - Deployed at athena-admin.herokuapp.com
12. Microservice Backend Architecture Design
13. Database design and Implementation
14. Update Information of Students
15. Data collection
16. Organizer Services
17. Module Run Requests
18. Implementation of Machine Learning Models with Brain.Js


-  **Anand Rajaram**
1. Login with form validation
2. Signup for users and organizers
3. Reset Password functionality in frontend
4. Event display
5. Event organization
6. Discover page with event search and user search
7. Organizer and Student interests( fixed Anuj's stuff and made everything proper )
8. UI DESIGN
9. Form validation everywhere
10. Angular deployment to AWS S3
11. Captcha verification for Crucial Pages

**Anirudh Lakhotia**
1. JWT based authentication
2. Dashboard
3. Achievements
4. User Profile 
5. Image upload by GridFS 
6. Everything related to Images
7. Module run request
8. UI design
9. Data collection from Frontend

**Vijay Dharmaji**
1. Mailing
2. Interests




See also the list of  [contributors](https://github.com/your/project/contributors)  who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

- This project is developed in conjunction with Cisco India Ltd, as part of their Talent Outreach Programme


COMPLETE MODULES:
config/database.js
config/encryptionConfig.js
config/serverConfig.js
controllers/search/search_controller.js
controllers/tokenExtractor.js

## INFO ON BRAIN.JS
Before installation, try to update npm to its latest version by 
```
sudo npm install npm@latest -g
```

It should, theoretically, do the trick. If it does not, then you will have to compile the brain.js libraries yourself before deployment

## EVENT INTERESTS
1. Go about adding a new event as usual.
2. Open the modal again.
3. Click on the "Reach out to more people" tab.
4. Add the interests you need.
5. Voila, you have now added interests to your events.

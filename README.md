
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


- **Anirudh Lakhotia**  -  _Project functionality with Angular. Implementation of JWT. _ (@anirudhlakhotia)
- **Sumuk Shashidhar**  -  _Request management and Authentication. Implementation of JWT. Recommendation Algorithm for Events_ (@sumukshashidhar)
- **Vijay Dharmaji**  -  _File Upload_ (@vijaydharmaji29)
-  **Anand Rajaram**  -  _Project functionality with Angular. Implementation of Events and Achievements_   (@anandrajaram21)

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



To DO:
 - Change Encryption Keys before deployment
 - Breakup of main_functions.js
 - 

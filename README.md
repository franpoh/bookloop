# TABLE-OF-CONTENTS

1. [Premise](#premise)
2. [User Stories](#user_stories)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Start Up](#start_up)



# PREMISE

To create a community-driven book swapping website, where users can sign up for free to trade books with each other, using a one-for-one exchange system. 



# USER_STORIES

Trello Agile Board: https://trello.com/b/Tb93uy07/bookloop-find-the-books-a-home

- [User Story 1] - As a guest, I can create a new account to use the website
- [User Story 2] - As a guest, I can sign into an existing account to use the website
- [User Story 3] - As a user, I can give away my read books, so that other people can enjoy them too
- [User Story 4] - As a user, I can look at a library of books so that I can browse around for books that I may enjoy
- [User Story 5] - As a user, I can leave reviews for books that I have read, for other users to peruse.
- [User Story 6] - As a user, I can obtain books that I'm interested in, so that I can read them
- [User Story 7] - As a user, I can look at other people's reviews so that I have a better understanding of a book
- [User Story 8] - As a user, I can search for book titles, so that I can find/search for a certain book
- [User Story 9] - As an admin, I can ban users who are not suitable to participate in the community



# FRONTEND

Frontend Github Repository: https://github.com/franpoh/bookloop

- Axios for frontend communication with servers by making http requests
- React for building user interface
- React Router Dom for webpage routing
- MUI, react UI library for certain components

UI Layout
- [Draft](./images/UI_Draft.jpg)
- [Final](./images/UI_Final.jpg)



# BACKEND

Backend Github Repository: https://github.com/franpoh/groupproject2-book

- PostgreSQL database
- Database deployed on Heroku PostgreSQL
- Sequelize for object relational mapping
- Express as our web framework to handle http requests
- Winston for logging
- Bcrypt for password hashing
- JSON web token for keeping user data authenticated at each new http request

Database Layout
- [Draft](./images//Database_Draft.jpg)
- [Final](./images//Database_Final.JPG)



# START_UP

Access our website at https://franpoh.github.io/bookloop/

You can also run it with 'npm start', which will host the site at http://localhost:3000/


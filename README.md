# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Andrei Georgescu     |
| Student ID    | 920776919       |
| Student Email | ageorgescu@mail.sfsu.edu    |

# Screenshots
<img src="https://i.imgur.com/oMYtfbx.png" />
<img src="https://i.imgur.com/HWIvlvi.png" />
<img src="https://i.imgur.com/xbmSLHu.png" />

# Build/Run Instructions
## Build Instructions
1. Clone the project.
2. Setup the MySQL database, `csc317db.sql` is located in `application/conf`.
3. Setup the MySQL database config located at `application/conf/database.js`.
4. Go into application directory via `cd application`.
5. Install dependencies with `npm install`.

## Run Instructions
1. Go into application directory via `cd application`.
2. Start the app with `npm start`.
3. Application is now running on [localhost:3000](http://localhost:3000).

# Extra Credit
- Registered users can leave comments on posts.
- Registered users have profiles that display their posts and statistics about their uploads such as total view count.
- Each post has a dedicated view count.
- Each posts has a "click to copy to clipboard" button for the url.
- Random quote is displayed at the top of the index page.
- Implemented a `/terms` page.
- Logged out users are redirected to the page they were on before accessing the `/login` or `/register` page after successfully logging in or creating an account.
- Registered users can use either their email or username to login.


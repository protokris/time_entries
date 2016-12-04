# Demo

This application is installed on HEROKU. 

[https://time-entries.herokuapp.com/](https://time-entries.herokuapp.com/)

# Problem

Write an application that tracks jogging times of users

- User must be able to create an account and log in

- When logged in, user can see, edit and delete his times he entered

- Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.

- Each time entry when entered has a date, distance, and time

- When displayed, each time entry has an average speed

- Filter by dates from-to

- Pagination

- Report on average speed & distance per week

- REST API. Make it possible to perform all user actions via the API, including authentication

- All actions need to be done client side using AJAX, refreshing the page is not acceptable.

- Unit and e2e tests!

# Installation

You will need to install some ruby gems.

`gem install bundler`

`bundle install`

_Note:  Sometimes bcrypt or nokogiri can be tricky as they compile on your local machine. There is no silver bullet for this as you will need to google a solution depending on your platform, e.g. Windows, Mac, Linux, etc._

You will need to install some javascript packages used for the front-end app.

`npm install`

You will need to create and migrate a database.  

`rake db:migrate`

Optionally seed the DB with a user and some data.

`rake db:seed`

Start the server.

`rails s`

# Tests

To run the REST API tests you can simply run:

`rake test`

You will see:

```
# Running:

.........................................

Finished in 1.194301s, 34.3297 runs/s, 72.0086 assertions/s.

41 runs, 86 assertions, 0 failures, 0 errors, 0 skips
```

To run the Javascript / React tests you run:

`rake teaspoon`

You will see:

```
Starting the Teaspoon server...
Teaspoon running default suite
..........................

Finished in 0.18200 seconds
26 examples, 0 failures

```

# Deploys

You will need heroku credentials and can then run

`git push heroku master`

To reset the database use:

`heroku pg:reset postgresql-octagonal-17191`

`heroku run rake db:migrate`

`heroku run rake db:seed`

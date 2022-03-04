## Session:

### Task1:

create an express application which contains two routes:

  - /login: show log in form
  - /admin: show welcome admin text


### Task 2: 

after user login, user should not be able to browse login page again and be redirect every time to admin page


### Task 3: 

in admin.ejs create an event listener to logout so it will send POST request to /logout so the server will kill the session and response with 'done' as json after getting done from the server, front end should redirect to /login page

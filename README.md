**How To Run**

To run the application you need to write command 'npm run start' or 'npm run dev' in terminal and press Enter.

**How It Works**

User profile has username (uniq), first name and last name, role (Possible values [user, moderator, admin]), rating, fields.
User tech fields are: username, first name, last name, role, password, salt, created at, updated at, deleted at fields.
User profile is public information (protection is not required).
User can create profile. During creation they should provide password.
User can change its profile fields or password. Admin can change everyones progile. Changes should are protected by JWT Auth.
User profiles list has pagination.
Users can vote for other users.
Voting limited by time and count.
Vote can be positive (+1) and negative (-1).
User can change or withdraw vote, but can not vote twice for the same profile.
User can not vote for him self.
User can vote one time per hour.
User profile have rating

The application is connected to mongoDB database and Postman and can sign up and sign in users, update user information and get all users list.

For sign up 'POST' request should be sent on port 'localhost:3000/signup'. required fields are: first_name, last-name, user_name and password.
For login 'POST' request should be sent on port 'localhost:3000/login'. required fields are: user_name and password. We get new TOKEN as autorisation which is 24 hours valid.
For update 'PUT' request should be sent on port 'localhost:3000/update/user_name'. required fields are: first_name, last-name and new password in Body and token in Auth.
For getAllUsers 'GET' request should be sent on port 'localhost:3000/getAllUsers'.
For getOneUser 'GET' request should be sent on port 'localhost:3000/getOneUser'.
For deleteUser 'delete' request should be sent on port 'localhost:3000/deleteUser/user-name'. Authorisation is required.
For giveVote 'POST' request should be sent on port 'localhost:3000/vote'. Required fields are votedFor and vote. Authorisation is required.
For userRating 'GET' request should be sent on port 'localhost:3000/vote/user_name'.

##env Usage Configuration
adding new variables must be with the format key=value, delimited by line breaks. Variables in .env files don’t require quotation marks unless there are spaces in the value.

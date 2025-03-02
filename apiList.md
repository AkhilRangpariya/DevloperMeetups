# DevMeet APIs

## authRouter
- POST /signup
- POST /login
- Post /logout

## profileRouter
- GET / profile/view
- PATCH /profile/edit
- PARCH /profile/password

### STATUS: 
ignore - pass
interested - like 
accepeted - 
rejected - 

## connection RequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET / connections
- GET /requests/received
- GET /feed - gets you the profiles of other user on plateforms


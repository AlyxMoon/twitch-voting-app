# Pokket's Voting App

## Required Features
- Users can search for any game in the Twitch game repository
- Users can make a new vote or vote on an existing game
- Pokket will have the ability to remove a game from the vote
- Pokket can use her Twitch emotes to show her opinion on games that have been voted on


##### Reference of similar app
https://lirikker.com/lirik/subday/

## Roadmap
- [x] Pick framework for frontend
- [x] Pick framework for backend server
- [x] Pick database technology
- [ ] Enable connecting to twitch
  - [ ] Authorize with Pokket to allow her to moderate stuff
- [ ] Get emotes of channel via twitch
- [ ] Create/connect to chatbot to view commands (`!vote`)

- [ ] Complete Frontend
  - [ ] Home page
    - [ ] Contains list of polls and their info
    - [ ] Useful links or info
  - [ ] Page for managing polls
    - [ ] Add a new poll
    - [ ] Set a poll to be currently active for voting
    - [ ] Delete a poll
    - [ ] Limit game selection to specified list
  - [ ] Page/component for viewing a poll
    - [ ] Show list of top ten games that have been voted on
    - [ ] Option to show full list of voted games
    - [ ] Allow Pokket to give a reaction to a game
    - [ ] Allow Pokket to remove a game from the selection
  - [ ] Login component
    - [ ] Link to Twitch auth
  - [ ] Games component
    - [ ] Load list of games
    - [ ] Allow searching the game list
    - [ ] Allow Pokket to ban a game so it cannot be voted on
    - [ ] Allow Pokket to unban a game
    - [ ] Allow Pokket to create aliases for a game


- [ ] Complete Backend
  - [ ] Manage chatbot
  - [ ] Connect via twitch
    - [ ] Allow Pokket to authorize to manage stuff in frontend
    - [ ] Allow chatbot to authorize to connect to Pokket's chat
  - [ ] poll management (to/from db)
    - [ ] Save a vote selection for a poll
    - [ ] Return poll info
    - [ ] Save Pokket's reaction to a game
    - [ ] Remove a game and all its votes from the poll
    - [ ] Set a poll to be active or not
  - [ ] return a list of polls (from db)
  - [ ] Connect to Giant Bomb for list of games
    - [ ] Register and get an API key
  - [ ] Save list of banned games to the db
  - [ ] Save alias for a game to the db


- [ ] Complete chatbot
  - [ ] Allow connecting a Twitch account to be used as the chatbot
  - [ ] Listen to chat and respond to the `!vote` command to record a user's choice
  - [ ] Listen to chat and respond to the `!myvote` command to tell a user if they have made a vote on current poll

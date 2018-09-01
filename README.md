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
- [x] Get emotes of channel via twitch
- [x] Create/connect to chatbot to view commands (`!vote`)

- [ ] Complete Frontend
  - [ ] Home page
    - [x] Contains list of polls and their info
    - [ ] Useful links or info
  - [x] Page for managing polls
    - [x] Add a new poll
    - [x] Set a poll to be currently active for voting
    - [x] Delete a poll
    - [ ] Limit game selection to specified list
  - [ ] Page/component for viewing a poll
    - [ ] Show list of top ten games that have been voted on
    - [ ] Option to show full list of voted games
    - [x] Allow Pokket/mods to give a reaction to a game
    - [ ] Allow Pokket/mods to remove a game from the selection
  - [x] Login component
    - [x] Link to Twitch auth
  - [ ] Games component
    - [ ] Load list of games
    - [ ] Allow searching the game list
    - [ ] Allow Pokket/mods to ban a game so it cannot be voted on
    - [ ] Allow Pokket/mods to unban a game
    - [ ] Allow Pokket/mods to create aliases for a game
  - [ ] Page for stream overlay
    - [ ] Active connection to server, show minimalist list of poll/top votes
    - [ ] Active connection to server, show message when a user votes


- [ ] Complete Backend
  - [x] Manage chatbot
  - [ ] Connect via twitch
    - [x] Connect to twitch authentication
    - [x] Allow Pokket/mods to authorize to manage stuff in frontend
    - [ ] Allow chatbot to authorize to connect to Pokket's chat
  - [ ] poll management (to/from db)
    - [x] Save a vote selection for a poll
    - [x] Return poll info
    - [x] Save Pokket's reaction to a game
    - [x] Remove a game and all its votes from the poll
    - [x] Set a poll to be active or not
  - [x] return a list of polls (from db)
  - [x] Connect to Giant Bomb for list of games
    - [x] Register and get an API key
    - [x] Switch to /games endpoint
    - [ ] Filter by game name/platforms
  - [ ] Save list of banned games to the db
  - [ ] Save alias for a game to the db
  - [ ] Allow configuring what platforms to search for


- [ ] Complete chatbot
  - [ ] Allow connecting a Twitch account to be used as the chatbot
  - [x] Listen to chat and respond to the `!vote` command to record a user's choice
  - [ ] Listen to chat and respond to the `!myvote` command to tell a user if they have made a vote on current poll

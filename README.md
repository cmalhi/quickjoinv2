## QuickJoin

> Meet players who want to play the same online video game as you!

## Usage

- A live demo of this app will be deployed to heroku within the next -3 days! (as of 10/31/2017)

## Requirements

- Node 6.11.x

## Development

To run a local instance...

Run ```npm install``` in root directory to install all node modules
Run ```npm start``` to start local server
In a separate terminal window type in the command: ```cd client``` to change to /client directory
Run ```npm install``` in /client directory to install all node modules
Run ```npm start``` to start client

Add a file ```quickjoinv2/server/config.js``` It must contain: 
```
module.exports = {
  IGDBUrl: 'YOUR_API_URL',
  IGDBKey: 'YOUR_API_KEY',
};

```

The client and server are running on 2 different hosts. The client uses proxy for API calls.

## Screenshot

![](images/quickjoin.png?raw=true)

## Technology Stack

![](images/techstack.png?raw=true)

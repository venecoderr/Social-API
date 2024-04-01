# Social API

![Github license](https://img.shields.io/badge/license-Unlicense-blue.svg)

## Description

To test my knowledge of NoSQL, MongoDB and Mongoose I built a back end for a hypothetical social media app, this backend allows for people to post thoughts, react to them and befriend other users and all that data is managed through mongoDB

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [License](#license)
- [walkthrought](#walkthrought)
## Installation
npm i will take care of all necessary dependencies
## Usage

API endpoints available are `/users` and `/thoughts`

## `/users`:
- GETs: 
    - `/users` gets all users
    - `/users/:id` gets a user using ID
- POSTs: 
    - `/users` creates a new user
    - `/users/:id` adds a friend to user (Pass new friend ID in body)
- PUTs:
    - `/users/:id` edits users using ID
- DELETEs: 
    - `/users/:id/` deletes users using ID
    - `/users/:id/friends/:friendId` deletes friends from users using IDs

## `/thoughts`:
- GETs: 
    - `/thoughts` gets all thoughts
    - `/thoughts/:id` gets a thought using ID
- POSTs: 
    - `/thoughts` creates a new thought
    - `/thoughts/:id` adds a reaction to thought (Pass new friend ID in body)
- PUTs:
    - `/thoughts/:id` edits thoughts using ID
- DELETEs: 
    - `/thoughts/:id/` deletes thoughts using ID
    - `/thoughts/:id/reaction/:reactionId` deletes reaction from thoughts using IDs

## Tests

No test provided

## Questions

For questions contact me at [Github](https://github.com/venecoderr) or [Email me](mailto:josefrm.55@gmail.com)

## License

This project is under the Unlicense license

## Walkthrought

https://drive.google.com/file/d/1MY9HMJbnkWBfOGFURJj3p66wRf_ipXyR/view
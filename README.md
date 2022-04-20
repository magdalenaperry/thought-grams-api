# Thought-Grams Social Media API

![](https://img.shields.io/badge/License-MIT-white.svg)

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Demos](#demos)
6. [Questions](#questions)

---
## Description
This is an application made using express, controllers, routers, and Insomnia to create a functional API for a social media platform. Routes and controls were created to manipulate thoughts, users, and reactions using an API.

---
## Installation
    npm install

---

## Technologies
- express
- [Insomnia](https://insomnia.rest/download)

---

## Usage
    nodemon
`open Insomnia and input the following routes`
<!--  -->

### User Routes
---
<!--  -->
- `api/users`
    * `GET`  to get all users
    * `POST` to create user
<!--  -->
- `api/users/:_Id`
  * `GET` to get a single user
  * `DELETE` to delete user
  * `PUT` to update a user
<!--  -->
- `api/users/:userId/friends/:friendId`
  * `POST` to createFriend
  * `DELETE` to deleteFriend
<!--  -->

---
### Thought Routes

- `api/thoughts`
    * `GET` to get all thoughts
    * `POST` to create thought
<!--  -->
- `api/thoughts/:_id`
    * `GET` to get a single thought
    * `DELETE` to delete thought
    * `PUT` to update thought
<!--  -->
- `api/thoughts/:thoughtId/reactions`
    * `POST` to create reaction
<!--  -->
- `api/thoughts/:thoughtId/reactions/:reactionId`
    - `DELETE` to delete reaction

---


## Demos
[Get ALL Users/Thoughts Link](https://youtu.be/oLeG26oQcdU)

[Get Users/Thoughts by ID Link](https://youtu.be/77l3sMISmNE)

[Post, Update, Delete Users Link](https://youtu.be/ZdOx0iiOxhc)

[Post, Update, Delete Thoughts Link ](https://youtu.be/khfNWHfk4UA)

[Create/Delete Friends Link](https://youtu.be/cAPDarDS4og)

[Create/Delete Reactions Link](https://youtu.be/vbu-U_0QIB4)


---
## Questions
For any additional questions, please reach out to me through email and follow me on GitHub.

github: 
[Magdalena Perry GitHub](https://www.github.com/magdalenaperry)

email: 
mageltron@gmail.com
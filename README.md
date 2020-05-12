### [<<< BACK](http://phonebook-fs.azurewebsites.net/)  (to application)

# Phonebook Full-Stack

Tapio Mäntysalo, Full Stack 2, UTU, 2020

**Front/Back exercises, part 3 final**

## Application
http://phonebook-fs.azurewebsites.net/

### Git
https://gitlab.utu.fi/dfte/fullstack-2020/web-basics/phonebook-fullstack

### Debugging
Backend: 
```
Launch Backend 
```
Frontend: 
```
> npm client
Launch Frontend
```
You can debug and hit breakpoints in both backend and frontend simultaneously.

CORS is used only when host name contains 'LAPTOP', i.e. locally on authors machine.

### Run deployment version locally
```
> npm start
```
### Build deployment version
Front-end, backend and source documentation
```
> npm run build-all
```
Back-end only (with docs)
```
> npm run build-server
```
Front-end only (with docs)
```
> npm run build-client
```
    Note that building frontend clears backend docs

### Source code documentation
Click **Documentation** in the application

### What else?
* Typescript was used in both backend and frontend.
* I tried to follow recommended practices in backend and frontend as much as I could find info.
* Some small front-end methods have jest tests, but this was rather trivial project code-wise (not configuration-wise), so I didn't do more unit tests.
* Bootstrap used for UI.

### Finally
Thank you, this was fun.
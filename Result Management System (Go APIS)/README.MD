
<div align="center">

# Result Managment System
#### This is a basic Rest Api Build using Go Lang. To perform CRUD operations on sqlite Database.
###### Aim: To build a rest api throgh which students can find there own result and only teachers can perform crud operations on the result db.

#
</div>



## Features

> Authentication

> CRUD Operations on Result

> Search Student Result

> Users(Student & Teacher)



## Packages

> Jwt-Go : github.com/dgrijalva/jwt-go

> Gorilla Mux: github.com/gorilla/mux

> Sql Lite: github.com/mattn/go-sqlite3


## How to Use It?

This project behave differet according to different user so here we have two users follow given below steps for each one
* ### Student
    For finding student result we have to make a POST request on the given below link and pass student name and roll no in body with it.
    > localhost:3000/student/result
* ### Teacher
    So as we know that Teacher user kind of super user in this project so now let's see how we can use this project as a teacher.
    
    * Teacher Authentication
        To do that we have to make a POST request on ```localhost:3000/teacher/login``` and passing email and password of teacher through body. If teacher is successfuly authenticated then he/she will get a auth token save it.
    * Add Result
        To do that we have to make a POST request on ```localhost:3000/addresult``` and passing details of result through body and also passing token through header.
    * Get Results
        To do that we have to make a GET request on ```localhost:3000/results``` and  passing token through header.
    * Get Result
        To do that we have to make a GET request on ```localhost:3000/result/{id}``` and  passing token through header. 
    * Update Result
        To do that we have to make a PUT request on ```localhost:3000/addresult``` and passing details of edited result through body and also passing token through header.
    * Delete Result
         To do that we have to make a Delete request on ```localhost:3000/result/{id}``` and  passing token through header.
    * ##### Note In get, update and delete result we have to pass reult id in place of {id}




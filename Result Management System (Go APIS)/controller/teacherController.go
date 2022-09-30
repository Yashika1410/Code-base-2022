package controller

import (
	"GoProject/Response"
	"GoProject/db"
	"GoProject/token"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func LoginTeacher(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var teacher db.Teacher
	json.Unmarshal(reqBody, &teacher)
	findTeacher := db.LoginTeacher(teacher.Email)
	if findTeacher.Id == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "User Not Exists"})
	} else if findTeacher.Password != teacher.Password {
		w.WriteHeader(http.StatusUnauthorized)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 401, Msg: "Unauthroized Worng Password"})

	} else {
		token, err := token.GenerateJWT(findTeacher.Email)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "Some Error Occured"})
			return
		}
		json.NewEncoder(w).Encode(Response.User{Token: token, User: findTeacher})
	}

}

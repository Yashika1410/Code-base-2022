package main

import (
	"GoProject/controller"
	"GoProject/db"
	"GoProject/token"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func handleReq() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.Handle("/", http.FileServer(http.Dir("./public")))
	myRouter.HandleFunc("/student/result", controller.SearchResult).Methods("POST")
	myRouter.HandleFunc("/teacher/login", controller.LoginTeacher).Methods("POST")

	myRouter.Handle("/results", token.IsAuthorized(controller.GetAll))
	myRouter.Handle("/addresult", token.IsAuthorized(controller.AddResult)).Methods("POST")
	myRouter.Handle("/result/{id}", token.IsAuthorized(controller.DeleteResult)).Methods("DELETE")
	myRouter.Handle("/result/{id}", token.IsAuthorized(controller.UpdateResult)).Methods("PUT")
	myRouter.Handle("/result/{id}", token.IsAuthorized(controller.GetResult))
	log.Println("listening on port 3000....")
	log.Fatal(http.ListenAndServe(":3000", myRouter))
}
func main() {
	db.CreateDb()
	db.CreateInstance()
	handleReq()
}

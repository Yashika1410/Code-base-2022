package controller

import (
	"GoProject/Response"
	"GoProject/db"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

// func HomePage(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "text/html; charset=utf-8")
// 	fmt.Fprintf(w, http.Dir("./public")) // sending text response
// }
func GetAll(w http.ResponseWriter, r *http.Request) {
	resultsJson, _ := json.MarshalIndent(db.GetAllResults(), "", " ")
	fmt.Fprintf(w, string(resultsJson))
}
func GetResult(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	if db.CheckIfResultExists(id) == false {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "Result Not Found!"})
		return
	}
	json.NewEncoder(w).Encode(db.GetResult(id))
}
func DeleteResult(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	if db.CheckIfResultExists(id) == false {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "Result Not Found!"})
		return
	}
	fmt.Fprintf(w, db.DeleteResult(id))
}
func AddResult(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var result db.Result
	json.Unmarshal(reqBody, &result)
	res := db.AddResult(result)
	if strings.Split(res, ":")[0] == "UNIQUE constraint failed" {
		w.WriteHeader(http.StatusConflict)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 409, Msg: res})
	} else {
		fmt.Fprintf(w, res)
	}
}

func UpdateResult(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	if db.CheckIfResultExists(id) == false {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "Result Not Found!"})
		return
	}
	reqBody, _ := ioutil.ReadAll(r.Body)
	var newresult db.Result
	json.Unmarshal(reqBody, &newresult)
	fmt.Fprintf(w, db.UpdateResult(id, newresult))
}
func SearchResult(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var result db.Result
	json.Unmarshal(reqBody, &result)
	findResult := db.SearchResult(result.Name, result.Rollno)
	if findResult.Id == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response.Response{Status: 404, Msg: "Result Not Found"})
	} else {
		json.NewEncoder(w).Encode(findResult)
	}

}

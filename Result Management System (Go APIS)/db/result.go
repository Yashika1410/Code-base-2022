package db

type Result struct{
	Id int `json:"id"`
	Name string  `json:"name"`
	Rollno string  `json:"rollno"`
	DOB string  `json:"dob"` 
	Score int `json:"score"`
}
package db

import (
	"fmt"
	"log"
	_ "github.com/mattn/go-sqlite3" 
)



func CreateResultTable() {
	createResultTableSQL := `CREATE TABLE IF NOT EXISTS result (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"rollno" TEXT NOT NULL UNIQUE,
		"name" TEXT, 
		"dob" TEXT,
		"score" TEXT		
	  );`

	statement, err := SqliteDb.Prepare(createResultTableSQL)
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec()
}

func AddResult(result Result) string {
	log.Println("Inserting result record ...")
	insertResultSQL := `INSERT INTO result(rollno, name, dob, score) VALUES (?, ?, ?, ?)`
	statement, err := SqliteDb.Prepare(insertResultSQL)
	if err != nil {
		// log.Fatalln(err.Error())
		return err.Error()
	}
	_, err = statement.Exec(result.Rollno,result.Name, result.DOB,result.Score)
	if err != nil {
		// log.Fatalln(err.Error())
		return err.Error()
	}
	return "Successfully Added"
}
func GetAllResults() []Result{
	row, err := SqliteDb.Query("SELECT * FROM result ORDER BY name")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	var results []Result
	for row.Next() { 
		result:=Result{}
		row.Scan(&result.Id, &result.Rollno, &result.Name,  &result.DOB,&result.Score)
		results=append(results,result)
		result=Result{}
	}
	return results
}
func GetResult(id int) Result{
	row, err:=SqliteDb.Query("SELECT * FROM result WHERE id=?",id)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	result:=Result{}
	if row.Next(){
	row.Scan(&result.Id, &result.Rollno, &result.Name, &result.DOB,&result.Score)
	}
	return result
}
func CheckIfResultExists(id int) bool {
	var result Result
	result=GetResult(id)
	if result.Id == 0 {
		return false
	}
	return true
}
func UpdateResult(id int, result Result) string{
	stmt, err := SqliteDb.Prepare("UPDATE result set name = ?, rollno = ?, score = ?, dob=? where id = ?")
	if err != nil {
		return err.Error()
	}
	defer stmt.Close()

	_, err1 := stmt.Exec(result.Name,result.Rollno,result.Score,result.DOB,id)
	if err1 != nil {
		return err.Error()
	}
	res:=fmt.Sprint("Result ID: ",id," got updated")
	return res

}
func DeleteResult(id int) string{
stmt,err:=SqliteDb.Prepare("DELETE FROM result where id = ?")
if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = stmt.Exec(id)
	if err != nil {
		log.Fatalln(err.Error())
		return "Some Error Occured"
	}
	return "Successfully Deleted"
}
func SearchResult(name string,rollno string) Result{
	row, err:=SqliteDb.Query("SELECT * FROM result WHERE name=? and rollno=? ",name, rollno)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	result:=Result{}
	if row.Next(){
	row.Scan(&result.Id, &result.Rollno, &result.Name, &result.DOB,&result.Score)
	}
	return result
}
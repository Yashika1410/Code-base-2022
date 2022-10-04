package db
/*
This Module is used for Database connection setup and creating instance
*/
import (
	
	"database/sql"
	"log"
	"os"
	_ "github.com/mattn/go-sqlite3" 
)

var SqliteDb *sql.DB
// Check If Sqlite database is present or not
func fileNotExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return true
	}
	return info.IsDir()
}
// If the database is judt created then we have to setup it for that we are using this setupDb function
// This function calls multiple function to create tables inside db and also create some dumy data 
func setupDb(){
		CreateInstance()
		CreateTeacherTable()
		CreateResultTable()
		AddTeacher(Teacher{Email:"teachera@gmail.com", Password:"root"})
		AddTeacher(Teacher{Email:"teacherb@gmail.com", Password:"root"})
		AddResult(Result{Rollno:"0001",Name: "Alayna Armitage", DOB:"22-08-1999",Score:89})
		AddResult(Result{Rollno:"0002",Name: "Martin Martins", DOB:"14-07-1997",Score:92})
		SqliteDb.Close()
}
// This function is creating and setuping the whole database
func CreateDb() {
	// checking database exists or not
	if fileNotExists("sqlite-database.db") {
		// if not creating it
		log.Println("Creating sqlite-database.db...")
		file, err := os.Create("sqlite-database.db")
		if err != nil {
			log.Fatal(err.Error())
		}
		file.Close()
		// setuping the db
		setupDb()
		log.Println("sqlite-database.db created")
	}

}
// creating instance for db to perform crud operation
func CreateInstance() {
	SqliteDb, _ = sql.Open("sqlite3", "./sqlite-database.db")
}

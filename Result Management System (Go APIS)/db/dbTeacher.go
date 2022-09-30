package db

import (
	"log"
)

func CreateTeacherTable() {
	createTeacherTableSQL := `CREATE TABLE IF NOT EXISTS teacher (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"email" TEXT NOT NULL UNIQUE,
		"password" TEXT	 	
	  );`

	statement, err := SqliteDb.Prepare(createTeacherTableSQL)
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec()
}
func AddTeacher(teacher Teacher) string {
	log.Println("Inserting Teacher record ...")
	insertTeacherSQL := `INSERT INTO teacher(email,password) VALUES (?, ?)`
	statement, err := SqliteDb.Prepare(insertTeacherSQL)
	if err != nil {
		log.Fatalln(err.Error())
		return "Some Error Occured"
	}
	_, err = statement.Exec(teacher.Email,teacher.Password)
	if err != nil {
		log.Fatalln(err.Error())
		return "Some Error Occured"
	}
	return "Successfully Added"
}
func LoginTeacher(email string) Teacher{
row, err:=SqliteDb.Query("SELECT * FROM teacher WHERE email=?",email)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	teacher:=Teacher{}
	if row.Next(){
	row.Scan(&teacher.Id, &teacher.Email, &teacher.Password)
	}
	return teacher
}
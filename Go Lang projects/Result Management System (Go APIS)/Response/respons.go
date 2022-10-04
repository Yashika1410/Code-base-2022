package Response

import (
	"GoProject/db"
)

type Response struct {
	Status int    `json:"status"`
	Msg    string `json:"msg"`
}
type User struct {
	Token string     `json:"token"`
	User  db.Teacher `json:"User"`
}

package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func data(w http.ResponseWriter, res *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	http.ServeFile(w, res, "data/data.json")
}

func manifest(w http.ResponseWriter, res *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	http.ServeFile(w, res, "ui/build/manifest.json")
}

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "ui/build/index.html")
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", home).Methods("GET", "OPTIONS")
	r.HandleFunc("/data.json", data).Methods("GET", "OPTIONS")
	r.HandleFunc("/manifest.json", manifest).Methods("GET", "OPTIONS")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("ui/build/static/"))))

	err := http.ListenAndServe(":8080", r)
	if err != nil {
		fmt.Printf("Couldnt start server: %q\n", err)
	}
}

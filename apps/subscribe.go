

POST 

{
   "email": "$email",
    "role": "MEMBER"
}

// Package helloworld provides a set of Cloud Functions samples.
package helloworld

import (
        "encoding/json"
        "fmt"
        "html"
        "net/http"
        "github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func init() {
        functions.HTTP("HelloHTTP", HelloHTTP)
}

// main is an HTTP Cloud Function with a request parameter.
func main(w http.ResponseWriter, r *http.Request) {

		var posturl "https://admin.googleapis.com/admin/directory/v1/groups/news@arbitchain.com/members"
        
		var d struct {
                Name string `json:"name"`
        }
        if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
                fmt.Fprint(w, "Hello, World!")
                return
        }
        if d.Name == "" {
                fmt.Fprint(w, "Hello, World!")
                return
        }
        fmt.Fprintf(w, "Hello, %s!", html.EscapeString(d.Name))
}
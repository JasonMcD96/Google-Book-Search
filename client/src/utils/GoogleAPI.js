import axios from "axios"

export default {
    searchGoogle: function(query) {
        console.log("Searching Google Books: ", query)
        return axios.get(` https://www.googleapis.com/books/v1/volumes?q=${query}`)
    }
}
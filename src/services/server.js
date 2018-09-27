export default {
    getBooks: function() {
        //let BaseURL = 'http://localhost/api/allyfrose/books';
        let BaseURL = 'http://allyfrose.com/api/allyfrose/books';
        //API: http://allyfrose.com/api/allyfrose/getAllPoetry
        //http://allyfrose.com/api/allyfrose/getPoetryById?poetryId=1
        //http://allyfrose.com/api/allyfrose/updatePoetryLikeById?poetryId=1
        return new Promise((resolve, reject) =>{
            fetch(BaseURL, {
                method: 'GET'
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    getFavourites: function(id) {
        let BaseURL = 'http://localhost/api/allyfrose/getFavourites?bookId=';
        return new Promise((resolve, reject) =>{
            fetch(BaseURL+id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    getBookInfo: function(id) {
        let BaseURL = 'http://localhost/api/allyfrose/getBookInfo?bookId=';
        return new Promise((resolve, reject) =>{
            fetch(BaseURL+id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    setFavourites: function(userData) {
        let BaseURL = 'http://localhost/api/allyfrose/setFavourites';
        return new Promise((resolve, reject) =>{
            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
            .then((response) => response.json())
                .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
    
}
var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        books: {},
        userResults: {
            docs: {}
        },
        userText: "",
        selectedType: "",
        // isbn: [],
        userSaves: [],
        csrf_token: "",
        numberOfIsbn: 2,
        subjects: ["javascript", "html", "sci-fi"],
        subjectResults: {},
        fromUser: [],
        // user: '',


    },


    // computed: {
    //     limitedIsbn: function () {
    //         "userResults.docs.0.isbn.0"
    //     }

    // },

    methods: {

        createBook: function () {
            axios({
                method: 'post',
                url: '/api/v1/books/',
                data: {

                    "name": this.createName,
                }

            }).then(response => this.userSave())
        },
        ////////////////////////////////////////////////////////////////////////////
        // for testing purposes
        titleSearch: function () {
            let params = {}
            params['title'] = 'thief of souls'
            console.log(params['title'])
            axios({
                method: 'get',
                url: 'https://openlibrary.org/search.json?limit=5',
                params: params
            }).then(response => {
                console.log('this is the response.data', response.data)
                this.userResults = response.data
            })
        },
        ///////////////////////////////////////////////////////////////////////////

        getBook: function () {
            axios({
                method: 'get',
                url: 'https://openlibrary.org/search.json',

            }).then(response => this.books = response.data)
        },


        userSearch: function () {
            let params = {}
            params[this.selectedType] = this.userText
            console.log(`this is userSearch :${params}`)
            axios({
                method: 'get',
                url: 'https://openlibrary.org/search.json?limit=2',
                params: params
            }).then(response => {
                console.log('this is the response.data', response.data)
                this.userResults = response.data
            })

        },

        userSave: function (book, isbn) {
            axios({
                method: 'post',
                url: '/api/v1/books/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {

                    "title": book.title,
                    "author": book.author_name,
                    "isbn": isbn,
                    "author": [],
                    "subject": [],
                    "user": this.fromUser.id
                }

            }).then(response => {
                console.log(`from user!!!!!!!!!!!!`, this.fromUser)
                this.userSaves = response.data

                alert("you have saved a book to your shelf")
                console.log('here it is', this.userSaves)

            })

        },

        randomHomepage: function () {
            let randnum = Math.floor(Math.random() * this.subjects.length)
            let params = {}
            params["subject"] = this.subjects[randnum]
            console.log(params)
            axios({
                method: 'get',
                url: 'https://openlibrary.org/search.json?limit=2',
                params: params
            }).then(response => {
                console.log('this is the response.data', response.data)
                this.subjectResults = response.data
            })

        },

        loadCurrentUser: function () {
            axios({
                method: 'get',
                url: '/api/v1/currentuser/',

            }).then(response => {
                console.log(`this is currentuser`, response.data)
                this.fromUser = response.data
                console.log(`from user`, this.fromUser)

                // alert("no books are saved")

            })

        },

        removeFromShelf: function (bookToDelete) {
            console.log(`Im trying to delete a book`, bookToDelete)
            console.log('im trying to delte book with id', bookToDelete.id)
            axios({
                method: 'DELETE',
                url: `/api/v1/books/${bookToDelete.id}/`,
                headers: {
                    'X-CSRFToken': this.csrf_token
                },

            }).then(response => {
                console.log(`this is response from api`, response)
                this.loadCurrentUser()
            })

        },

        // loadUsers: function () {
        //     axios({
        //         method: 'get',
        //         url: '/api/v1/users/'
        //     }).then(response => this.users = response.data)
        // },



        // coverSearch: function () {
        //     let params = {}
        //     params[this.selectedType] = this.userText
        //     axios({
        //         method: 'get',
        //         url: ''
        //     })

    },


    created: function () {
        this.userSearch()
        this.randomHomepage()
        this.loadCurrentUser()
    },
    mounted: function () {
        this.csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }

})


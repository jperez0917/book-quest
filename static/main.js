var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        books: {},
        userResults: {},
        userText: "",
        selectedType: "",
        isbn: [],
        userSaves: [],
        csrf_token: "",
        numberOfIsbn: 2,


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
        titleSearch: function () {
            let params = {}
            params['title'] = 'better angels of our nature'
            console.log('BRUCE IS THE BEST!!!!', params['title'])
            axios({
                method: 'get',
                url: 'http://openlibrary.org/search.json?limit=2',
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
                url: 'http://openlibrary.org/search.json',

            }).then(response => this.books = response.data)
        },


        userSearch: function () {
            let params = {}
            params[this.selectedType] = this.userText
            axios({
                method: 'get',
                url: 'http://openlibrary.org/search.json?limit=2',
                params: params
            }).then(response => {
                console.log('this is the response.data', response.data)
                this.userResults = response.data
            })

        },

        userSave: function (book) {
            axios({
                method: 'post',
                url: '/api/v1/books/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {

                    "title": book.title,
                    "author": book.author_name,

                }

            }).then(response => this.userSaves = response.data),
                alert("you have saved an entry")
            console.log('here it is', this.userSaves)

        }



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
    }

})


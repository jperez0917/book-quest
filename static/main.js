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


    },

    methods: {
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
                url: 'http://openlibrary.org/search.json?limit=20',
                params: params
            }).then(response => {
                console.log('this is the response.data', response.data)
                this.userResults = response.data
            })

        },

        userSave: function () {
            axios({
                method: 'get',
                url: 'http://openlibrary.org/search.json',

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


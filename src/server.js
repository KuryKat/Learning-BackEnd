const express = require('express')
const app = express();
require('database')
const {
    modules: {
        methods: {
            getData,
            setData,
            pushData
        }
    }
} = require('./manager/index')

app.get('/', (req, res) => {
    res.send(`
    É.... clica ai se quiser buscar um livro<br>
    <a href="http://localhost:3000/search">Clique Aqui</a>
    `)
});

app.route('/search')
    .get((req, res) => {
        res.send(`É SÓ COLOCAR /book/ID E DAR ENTER, AINDA N FIZ ESSA BUSCA NÃO!br>
        <a href="http://localhost:3000/book/1">Clique Aqui Pra um Exemplo</a>
        `)
    })

app.route('/book/:id')
    .get(async(req, res) => {
        const { id } = req.params;
        const book = await getData(`book/${id}`)

        if (book == null) return res.status(404).send(`<h1>Error: ${res.statusCode}</h1><br><a href="http://localhost:3000">Click Here to back to Safe Lands</a>`);
        res.send(`Book: ${book.name}<br>ID:${id}`);
    })
    .post((req, res) => {
        res.send('Add a book');
    })
    .put((req, res) => {
        res.send('Update the book');
    });

app.listen(3000, () => {
    console.log("Server is running");
});

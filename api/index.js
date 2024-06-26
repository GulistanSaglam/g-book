const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs')
const Book = require('./models/Book');

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
const uploadMiddleware = multer({ dest: 'uploads/' });
app.use('/uploads', express.static(__dirname + '/uploads'))


dotenv.config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('Connected to db & listening port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    })



app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUserDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(newUserDoc);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    const passwordIsOk = bcrypt.compareSync(password, userDoc.password);
    // res.json(passwordIsOk);
    if (passwordIsOk) {
        jwt.sign({ id: userDoc._id, username }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({ id: userDoc._id, username })
        })
    } else {
        res.status(400).json('Wrong Credentials')
    }
})

app.post('/recommend', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, content } = req.body;
        const bookDoc = await Book.create({
            title,
            content,
            cover: newPath,
            author: info.id
        })

        res.json(bookDoc);
    })

})


app.put('/books/:id', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, content } = req.body;
        const bookDoc = await Book.findById({ _id: id })
        const isAuthor = JSON.stringify(bookDoc.author) === JSON.stringify(info.id)

        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }
        const updatedBook = await Book.findByIdAndUpdate({ _id: id }, {
            $set: {
                title,
                content,
                cover: newPath ? newPath : bookDoc.cover,
                author: info.id
            }
        })

        res.json(updatedBook);
    })

})


app.get('/books', async (req, res) => {

    const books = await Book.find({})
        .sort({ createdAt: -1 })
        .populate('author', ['username'])
        .limit(20);
    res.json(books)
})


app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById({ _id: id }).populate('author', ['username', 'id'])
    res.json(book)

})

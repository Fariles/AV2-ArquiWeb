const express = require('express')

const router = express.Router()

const Post = require('../models/post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        
        return res.send(posts)
    }catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/:id', getPost, async (req, res) => {
    res.json(res.post)
})

router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        conteudo: req.body.conteudo,
        foto: req.body.foto,
        status: req.body.status
    })

    try {
        const created = await post.save()

        res.status(201).json(created)
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})

router.patch('/:id', getPost, async (req, res) => {
    if (req.body.userId != null) {
        res.post.userId = req.body.userId
    }

    if (req.body.conteudo != null) {
        res.post.conteudo = req.body.conteudo
    }

    if (req.body.foto != null) {
        res.post.foto = req.body.foto
    }

    if (req.body.status != null) {
        res.post.status = req.body.status
    }

    try {
        const updated = await res.post.save()

        res.json(updated)
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})

router.delete('/:id', getPost, async (req, res) => {

    try {
        await res.post.remove()

        res.json({
            message: 'Deleted Successfully'
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

async function getPost(req, res, next) {
    try {
        post = await Post.findById(req.params.id)
        
        if (post == null) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
    }catch (e) {
        res.status(500).json({
            message: e.message
        })
    }

    res.post = post

    next()
}

router.get('/user/:id', getByUser, async (req, res) => {
    res.json(res.post)
})

async function getByUser(req, res, next) {
    try {
       
        post = await Post.find({
             userId: req.params.id 
        })
        
        if (post == null) {
            return res.status(404).json({
                message: 'Post not found.'
            })
        }
        
    }catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
    res.post = post
    next()
}

module.exports = router
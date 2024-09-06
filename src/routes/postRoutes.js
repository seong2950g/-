const express = require('express');
const { createPost, updatePost, deletePost, getPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);         // 게시글 생성
router.get('/', getPosts);            // 게시글 목록 조회
router.put('/:id', updatePost);       // 게시글 수정
router.delete('/:id', deletePost);    // 게시글 삭제

module.exports = router;

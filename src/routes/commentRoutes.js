const express = require('express');
const { createComment, updateComment, deleteComment, getComments } = require('../controllers/commentController');
const router = express.Router();

router.post('/', createComment);         // 댓글 생성
router.get('/', getComments);            // 댓글 목록 조회
router.put('/:id', updateComment);       // 댓글 수정
router.delete('/:id', deleteComment);    // 댓글 삭제

module.exports = router;

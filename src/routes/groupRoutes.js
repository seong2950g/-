const express = require('express');
const { createGroup, getGroups, updateGroup, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.post('/', createGroup);     // 그룹 생성
router.get('/', getGroups);        // 그룹 목록 조회
router.put('/:id', updateGroup);   // 그룹 수정
router.delete('/:id', deleteGroup); // 그룹 삭제

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 댓글 등록
exports.createComment = async (req, res) => {
  const { content, postId, password } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { content, postId: Number(postId), password }
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: '댓글 등록 실패' });
  }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content, password } = req.body;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });
    if (comment.password !== password) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content }
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: '댓글 수정 실패' });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });
    if (comment.password !== password) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    await prisma.comment.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '댓글 삭제 실패' });
  }
};

// 댓글 목록 조회
exports.getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: '댓글 조회 실패' });
  }
};

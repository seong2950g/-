const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 게시글(추억) 등록
exports.createPost = async (req, res) => {
  const { title, content, groupId, isPublic, password } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, groupId: Number(groupId), isPublic, password }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: '게시글 등록 실패' });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, isPublic, password } = req.body;
  
  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (post.password !== password) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, isPublic }
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: '게시글 수정 실패' });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (post.password !== password) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    
    await prisma.post.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '게시글 삭제 실패' });
  }
};

// 게시글 목록 조회
exports.getPosts = async (req, res) => {
  const { groupId } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: { groupId: Number(groupId) }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: '게시글 조회 실패' });
  }
};

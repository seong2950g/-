import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

//그룹 등록
app.post('/groups', async (req, res) => {
  const { name, password, imageUrl, isPublic, introduction } = req.body;
  const group = await prisma.group.create({
    data: {
      name, password, imageUrl, isPublic, introduction,
      likeCount: 0,
      postCount: 0
    }
  })
  res.status(201).send(group);
});

//그룹 목록 조회
app.get('/groups', async (req, res) => {
  //const { offset = 0, limit = 10, order = 'newest' } = req.query;
  const groups = await prisma.group.findMany();
  res.send(groups);
});

//그룹 수정
app.patch('/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const group = await prisma.group.update({
    where: { id : groupId },
    data: req.body,
  });
  res.send(group);
});

//그룹 삭제
app.delete('/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  await prisma.group.delete({
    where: { id : groupId},
  });
  res.sendStatus(204);
});

//그룹 상세 정보 조회
app.get('/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  //groupId에 해당하는 그룹 상세 조회
  const group = await prisma.group.findUnique({
    where: { id : groupId }
  });
  res.send(group);

});

//그룹 조회 권한 확인
app.post('groups/:groupId/verify-password', async (req, res) => {
  const { groupId } = req.params;
});

//그룹 공감하기
app.post('groups/:group/like', async (req, res) => {
  const { groupId } = req.params;
});

//그룹 공개 여부 확인
app.get('groups/:groupId/is-public', async (req, res) => {
  const { groupId } = req.params;
});


//게시글 등록
app.post('/groups/:groupId/posts', async (req, res) => {
  const { groupId } = req.params;
  const { nickname, title, content, postPassword, 
    imageUrl, location, moment, isPublic } = req.body;

  const post = await prisma.post.create({
    data: {
      nickname, title, content, postPassword, imageUrl, location,
      moment: new Date(moment),
      isPublic,
      likeCount: 0,
      commentCount: 0,
      groupId: groupId,
    }
  })
  res.send(post);
});

//게시글 목록 조회
app.get('/groups/:groupId/posts', async (req, res) => {
  const { groupId } = req.params;
  const { posts } = await prisma.group.findUniqueOrThrow({
    where: { id: groupId },
    include: {
      posts: true,
    },
  });
  res.send(posts);
});

//게시글 수정
app.put('/posts/:postId', async (req, res) => {

});

//게시글 삭제
app.delete('/posts/:postId', async (req, res) => {

});

//게시글 상세 정보 조회
app.get('/posts/:postId', async (req, res) => {

});

//게시글 조회 권한 확인
app.post('/posts/:postId/verify-password', async (req, res) => {

});
//게시글 공감하기
app.post('/posts/:postId/like', async (req, res) => {

});
//게시글 공개 여부 확인
app.get('/posts/:postId/is-public', async (req, res) => {

});


//댓글 등록
app.post('/posts/:postId/comments', async (req, res) => {

});

//댓글 목록 조회
app.get('/posts/:postId/comments', async (req, res) => {

});

//댓글 수정
app.patch('/comments/:commentId', async (req, res) => {

});

//댓글 삭제
app.delete('/comments/:commentId', async (req, res) => {

});

app.listen(process.env.PORT || 3000, () => console.log("server started"));

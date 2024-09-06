import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.DATAVASE_URL).then(() => console.log('Connected to DB'));

const express = require('express');
const groupRoutes = require('./src/routes/groupRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentRoutes = require('./src/routes/commentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});

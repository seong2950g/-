const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 그룹 생성 로직
exports.createGroup = async (req, res) => {
  const { name, description, isPublic, password, imageUrl } = req.body;
  try {
    const group = await prisma.group.create({
      data: { name, description, isPublic, password, imageUrl }
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: '그룹 생성 실패' });
  }
};

// 그룹 목록 조회 로직
exports.getGroups = async (req, res) => {
  try {
    const groups = await prisma.group.findMany();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: '그룹 조회 실패' });
  }
};

// 그룹 수정 로직
exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, description, isPublic, password, imageUrl } = req.body;
  
  try {
    const updatedGroup = await prisma.group.update({
      where: { id: Number(id) },
      data: { name, description, isPublic, password, imageUrl }
    });
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: '그룹 수정 실패' });
  }
};

// 그룹 삭제 로직
exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const group = await prisma.group.findUnique({ where: { id: Number(id) } });
    
    if (group.password !== password) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    
    await prisma.group.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '그룹 삭제 실패' });
  }
};

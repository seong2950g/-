// baseUrl을 동적으로 가져옴
const baseUrl = new URLSearchParams(window.location.search).get('baseUrl');

document.getElementById('create-group-btn').addEventListener('click', () => {
  document.getElementById('group-create-section').style.display = 'block';
});

document.getElementById('group-create-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  
  const response = await fetch(`${baseUrl}/api/groups`, {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    alert('그룹이 성공적으로 생성되었습니다!');
    this.reset();
    loadGroupList();  // 그룹 목록 새로고침
  } else {
    alert('그룹 생성에 실패했습니다.');
  }
});

// 그룹 목록 불러오기
async function loadGroupList() {
  const response = await fetch(`${baseUrl}/api/groups`);
  const groups = await response.json();
  
  const groupList = document.getElementById('group-list');
  groupList.innerHTML = '';
  
  groups.forEach(group => {
    const groupItem = document.createElement('div');
    groupItem.innerHTML = `
      <h3>${group.name}</h3>
      <p>${group.description}</p>
      <p>공개 여부: ${group.isPublic ? '공개' : '비공개'}</p>
    `;
    groupList.appendChild(groupItem);
  });
}

loadGroupList();

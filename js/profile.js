// 个人中心页面JavaScript

function initProfile() {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }

    loadUserInfo();
}

function loadUserInfo() {
    const currentUser = getCurrentUser();
    const goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');
    const wants = JSON.parse(localStorage.getItem('xianyu_wants') || '[]');

    const myGoods = goodsList.filter(g => g.userId === currentUser.id);
    const myWants = wants.filter(w => w.userId === currentUser.id);

    const defaultAvatar = "images/icons/avatar1.svg";

    const profileCard = document.getElementById('profileCard');
    profileCard.innerHTML = `
        <img class="profile-avatar" src="${currentUser.avatar || defaultAvatar}" alt="头像" onerror="this.onerror=null;this.src='${defaultAvatar}'">
        <div class="profile-info">
            <div class="profile-name">${currentUser.nickname || currentUser.username}</div>
            <div class="profile-bio">${currentUser.bio || '这个人很懒，什么都没写~'}</div>
            <div class="profile-stats">
                <div class="stat-item">
                    <div class="stat-value">${myGoods.length}</div>
                    <div class="stat-label">发布</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${myWants.length}</div>
                    <div class="stat-label">想要</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${currentUser.fans || 0}</div>
                    <div class="stat-label">粉丝</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${currentUser.follow || 0}</div>
                    <div class="stat-label">关注</div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    initProfile();
});

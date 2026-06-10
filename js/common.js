// 公共函数 - 闲鱼购物平台

// 获取当前登录用户
function getCurrentUser() {
    const userStr = localStorage.getItem('xianyu_currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// 设置当前登录用户
function setCurrentUser(user) {
    localStorage.setItem('xianyu_currentUser', JSON.stringify(user));
}

// 退出登录
function logout() {
    localStorage.removeItem('xianyu_currentUser');
    showToast('已退出登录', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// 检查是否登录
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// 显示提示框
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
    if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前';

    return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
}

// 格式化价格
function formatPrice(price) {
    return price.toFixed(2);
}

// 获取用户信息
function getUserById(userId) {
    const users = JSON.parse(localStorage.getItem('xianyu_users') || '[]');
    return users.find(u => u.id === userId);
}

// 获取分类信息
function getCategoryById(categoryId) {
    const categories = JSON.parse(localStorage.getItem('xianyu_categories') || '[]');
    return categories.find(c => c.id === categoryId);
}

// 获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 验证手机号
function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 验证密码强度
function isValidPassword(password) {
    return password.length >= 6;
}

// 初始化页面导航栏
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const currentUser = getCurrentUser();
    const userActions = header.querySelector('.user-actions');

    // 使用内联SVG作为默认头像
    const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='14' fill='%23ffc107'/%3E%3Ctext x='14' y='18' text-anchor='middle' fill='%23333' font-size='12'%3E👤%3C/text%3E%3C/svg%3E";

    if (currentUser) {
        userActions.innerHTML = `
            <a href="publish.html" class="publish-btn">+ 发布</a>
            <div class="user-info">
                <img src="${currentUser.avatar || defaultAvatar}" alt="头像" onerror="this.onerror=null;this.src='${defaultAvatar}'">
                <a href="profile.html">${currentUser.nickname || currentUser.username}</a>
            </div>
            <button onclick="logout()">退出</button>
        `;
    } else {
        userActions.innerHTML = `
            <a href="login.html">登录</a>
            <a href="register.html">注册</a>
        `;
    }
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const keyword = searchInput.value.trim();
            if (keyword) {
                window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = searchInput.value.trim();
                if (keyword) {
                    window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
                }
            }
        });
    }
}

// 渲染商品卡片 - 瀑布流样式
function renderGoodsCard(goods) {
    const user = getUserById(goods.userId);
    const category = getCategoryById(goods.categoryId);

    // 使用内联SVG作为默认图片，避免加载失败循环
    const defaultImg = "images/goods/placeholder.svg";

    return `
        <div class="waterfall-item">
            <div class="card goods-card" onclick="window.location.href='goods-detail.html?id=${goods.id}'">
                <div class="card-image">
                    <img src="${goods.images[0]}" alt="${goods.title}" loading="lazy" onerror="this.onerror=null;this.src='${defaultImg}'">
                    ${goods.condition === '全新' ? '<span class="condition-tag new">全新</span>' : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${goods.title}</h3>
                    <div class="card-price">
                        <span class="price">${formatPrice(goods.price)}</span>
                        ${goods.originalPrice ? `<span class="original-price">¥${formatPrice(goods.originalPrice)}</span>` : ''}
                    </div>
                    <div class="card-footer">
                        <div class="seller">
                            <img src="${user ? user.avatar : 'images/icons/avatar1.svg'}" alt="头像" loading="lazy" onerror="this.onerror=null;this.src='images/icons/avatar1.svg'">
                            <span>${user ? user.nickname : '匿名用户'}</span>
                        </div>
                        <div class="card-stats">
                            <span>${goods.wantCount}人想要</span>
                        </div>
                    </div>
                    ${goods.tags && goods.tags.length > 0 ? `
                        <div class="card-tags">
                            ${goods.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// 想要/收藏功能
function toggleWant(goodsId) {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return false;
    }

    const currentUser = getCurrentUser();
    let wants = JSON.parse(localStorage.getItem('xianyu_wants') || '[]');

    const index = wants.findIndex(w =>
        w.userId === currentUser.id && w.goodsId === goodsId
    );

    if (index === -1) {
        wants.push({
            userId: currentUser.id,
            goodsId: goodsId,
            createTime: new Date().toISOString()
        });
        showToast('已加入想要', 'success');
    } else {
        wants.splice(index, 1);
        showToast('已取消想要', 'info');
    }

    localStorage.setItem('xianyu_wants', JSON.stringify(wants));
    return index === -1;
}

// 检查是否已想要
function isWanted(goodsId) {
    if (!isLoggedIn()) return false;

    const currentUser = getCurrentUser();
    const wants = JSON.parse(localStorage.getItem('xianyu_wants') || '[]');

    return wants.some(w =>
        w.userId === currentUser.id && w.goodsId === goodsId
    );
}

// 获取商品的想要数
function getWantCount(goodsId) {
    const wants = JSON.parse(localStorage.getItem('xianyu_wants') || '[]');
    return wants.filter(w => w.goodsId === goodsId).length;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSearch();
});

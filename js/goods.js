// 商品详情页面JavaScript

let currentGoods = null;

function loadGoodsDetail() {
    const goodsId = getUrlParam('id');
    if (!goodsId) {
        window.location.href = 'index.html';
        return;
    }

    const goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');
    currentGoods = goodsList.find(g => g.id === parseInt(goodsId));

    if (!currentGoods) {
        window.location.href = 'index.html';
        return;
    }

    // 更新页面标题
    document.title = `${currentGoods.title} - 闲鱼`;

    // 增加浏览量
    currentGoods.views++;
    localStorage.setItem('xianyu_goods', JSON.stringify(goodsList));

    // 渲染详情
    renderGoodsDetail();
    renderBottomBar();
}

function renderGoodsDetail() {
    const user = getUserById(currentGoods.userId);
    const category = getCategoryById(currentGoods.categoryId);
    const isWantedGoods = isWanted(currentGoods.id);
    const wantCount = getWantCount(currentGoods.id) + currentGoods.wantCount;

    const defaultImg = "images/goods/placeholder.svg";

    const detailContainer = document.getElementById('goodsDetail');

    detailContainer.innerHTML = `
        <!-- 商品图片 -->
        <div class="goods-images">
            <div class="image-container">
                <img src="${currentGoods.images[0]}" alt="${currentGoods.title}" id="mainImage" onerror="this.onerror=null;this.src='${defaultImg}'">
            </div>
            ${currentGoods.images.length > 1 ? `
                <div class="image-dots">
                    ${currentGoods.images.map((_, index) => `
                        <span class="dot ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>

        <!-- 商品信息 -->
        <div class="goods-info">
            <div class="goods-price">
                <span class="price">${formatPrice(currentGoods.price)}</span>
                ${currentGoods.originalPrice ? `<span class="original-price">¥${formatPrice(currentGoods.originalPrice)}</span>` : ''}
            </div>
            <h1 class="goods-title">${currentGoods.title}</h1>
            <div class="goods-meta">
                <span>${currentGoods.condition}</span>
                <span>${currentGoods.views}次浏览</span>
                <span>${wantCount}人想要</span>
                <span>${currentGoods.location}</span>
            </div>
            ${currentGoods.tags && currentGoods.tags.length > 0 ? `
                <div class="goods-tags">
                    ${currentGoods.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <div class="goods-desc">${currentGoods.description}</div>
        </div>

        <!-- 卖家信息 -->
        <div class="seller-info">
            <img class="seller-avatar" src="${user ? user.avatar : 'images/icons/avatar1.svg'}" alt="头像" onerror="this.onerror=null;this.src='images/icons/avatar1.svg'">
            <div class="seller-detail">
                <div class="seller-name">${user ? user.nickname : '匿名用户'}</div>
                <div class="seller-stats">
                    <span>信用等级 ${user ? user.level : 1}</span>
                    <span>已售 ${user ? user.sellCount : 0}件</span>
                    <span>${user ? user.fans : 0}粉丝</span>
                </div>
            </div>
            <button class="follow-btn">+ 关注</button>
        </div>
    `;
}

function renderBottomBar() {
    const isWantedGoods = isWanted(currentGoods.id);
    const bottomBar = document.getElementById('bottomBar');
    const currentUser = getCurrentUser();
    const isOwner = currentUser && currentUser.id === currentGoods.userId;

    bottomBar.innerHTML = `
        <div class="bottom-actions">
            <button class="action-item" onclick="window.location.href='index.html'">
                <span class="icon">🏠</span>
                <span>首页</span>
            </button>
            <button class="action-item ${isWantedGoods ? 'active' : ''}" onclick="handleWant()">
                <span class="icon">${isWantedGoods ? '❤️' : '🤍'}</span>
                <span>想要</span>
            </button>
            <button class="action-item" onclick="handleChat()">
                <span class="icon">💬</span>
                <span>私聊</span>
            </button>
        </div>
        <div class="buy-buttons">
            ${isOwner ? `
                <button class="want-btn" onclick="editGoods()">编辑</button>
                <button class="buy-btn" onclick="deleteGoods()">删除</button>
            ` : `
                <button class="want-btn" onclick="handleWant()">${isWantedGoods ? '已想要' : '我想要'}</button>
                <button class="buy-btn" onclick="handleBuy()">我想要</button>
            `}
        </div>
    `;
}

function changeImage(index) {
    const mainImage = document.getElementById('mainImage');
    const dots = document.querySelectorAll('.image-dots .dot');

    mainImage.src = currentGoods.images[index];
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function handleWant() {
    const result = toggleWant(currentGoods.id);
    renderBottomBar();
}

function handleChat() {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }
    showToast('私聊功能开发中...', 'info');
}

function handleBuy() {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }
    showToast('已发送想要请求给卖家', 'success');
}

function editGoods() {
    window.location.href = `publish.html?id=${currentGoods.id}`;
}

function deleteGoods() {
    if (!confirm('确定要删除这个商品吗？')) return;

    let goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');
    goodsList = goodsList.filter(g => g.id !== currentGoods.id);
    localStorage.setItem('xianyu_goods', JSON.stringify(goodsList));

    showToast('商品已删除', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadGoodsDetail();
});

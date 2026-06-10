// 首页JavaScript - 闲鱼风格

let currentCount = 0;
const pageSize = 12;
let currentSort = 'recommend';

// 轮播图功能
function initBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots .dot');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    let currentSlide = 0;
    let autoPlayTimer;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 3500);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.addEventListener('mouseenter', stopAutoPlay);
        bannerContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
}

// 加载分类
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('xianyu_categories') || '[]');
    const categoryGrid = document.getElementById('categoryGrid');

    categoryGrid.innerHTML = categories.map(category => `
        <a href="search.html?category=${category.id}" class="category-item">
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${category.name}</span>
        </a>
    `).join('');
}

// 加载商品列表
function loadGoods(sortType = 'recommend', loadMore = false) {
    let goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');

    // 只显示在售商品
    goodsList = goodsList.filter(g => g.status === '在售');

    // 排序
    switch (sortType) {
        case 'recommend':
            // 推荐算法：综合浏览量、想要数、发布时间
            goodsList.sort((a, b) => {
                const scoreA = a.views * 0.3 + a.wantCount * 0.5 + (new Date(a.createTime).getTime() / 1000000000) * 0.2;
                const scoreB = b.views * 0.3 + b.wantCount * 0.5 + (new Date(b.createTime).getTime() / 1000000000) * 0.2;
                return scoreB - scoreA;
            });
            break;
        case 'new':
            goodsList.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
            break;
        case 'price_asc':
            goodsList.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            goodsList.sort((a, b) => b.price - a.price);
            break;
    }

    // 分页
    if (!loadMore) {
        currentCount = 0;
    }

    const startIndex = currentCount;
    const endIndex = startIndex + pageSize;
    const pageGoods = goodsList.slice(startIndex, endIndex);

    // 渲染商品
    const goodsGrid = document.getElementById('goodsList');
    if (!loadMore) {
        goodsGrid.innerHTML = '';
    }

    pageGoods.forEach(item => {
        goodsGrid.innerHTML += renderGoodsCard(item);
    });

    currentCount = endIndex;

    // 更新加载更多按钮
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (currentCount >= goodsList.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

// 初始化筛选标签
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSort = tab.dataset.sort;
            loadGoods(currentSort);
        });
    });
}

// 初始化加载更多
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadGoods(currentSort, true);
        });
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    initBanner();
    loadCategories();
    loadGoods('recommend');
    initFilterTabs();
    initLoadMore();
});

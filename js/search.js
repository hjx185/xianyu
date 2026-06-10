// 搜索页面JavaScript

let currentKeyword = '';
let currentCategory = 'all';
let currentSort = 'recommend';

function initSearchPage() {
    currentKeyword = getUrlParam('keyword') || '';
    currentCategory = getUrlParam('category') || 'all';

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = currentKeyword;
    }

    initCategoryFilters();
    initSortFilters();
    initSearch();
    loadSearchResults();
}

function initCategoryFilters() {
    const categories = JSON.parse(localStorage.getItem('xianyu_categories') || '[]');
    const categoryFilters = document.getElementById('categoryFilters');

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category.id;
        btn.textContent = `${category.icon} ${category.name}`;
        categoryFilters.appendChild(btn);
    });

    const filterBtns = categoryFilters.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.dataset.category === currentCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            loadSearchResults();
        });
    });
}

function initSortFilters() {
    const sortFilters = document.getElementById('sortFilters');
    const sortBtns = sortFilters.querySelectorAll('.filter-btn');

    sortBtns.forEach(btn => {
        if (btn.dataset.sort === currentSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            loadSearchResults();
        });
    });
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentKeyword = searchInput.value.trim();
            loadSearchResults();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentKeyword = searchInput.value.trim();
                loadSearchResults();
            }
        });
    }
}

function loadSearchResults() {
    let goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');
    goodsList = goodsList.filter(g => g.status === '在售');

    // 关键词筛选
    if (currentKeyword) {
        const keyword = currentKeyword.toLowerCase();
        goodsList = goodsList.filter(goods =>
            goods.title.toLowerCase().includes(keyword) ||
            goods.description.toLowerCase().includes(keyword) ||
            goods.tags.some(tag => tag.toLowerCase().includes(keyword))
        );
    }

    // 分类筛选
    if (currentCategory !== 'all') {
        goodsList = goodsList.filter(goods =>
            goods.categoryId === parseInt(currentCategory)
        );
    }

    // 排序
    switch (currentSort) {
        case 'recommend':
            goodsList.sort((a, b) => b.views - a.views);
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

    // 更新结果数量
    document.getElementById('resultsCount').textContent = `共${goodsList.length}件商品`;

    // 渲染结果
    renderSearchResults(goodsList);
}

function renderSearchResults(goodsList) {
    const goodsGrid = document.getElementById('goodsList');
    const emptyState = document.getElementById('emptyState');

    if (goodsList.length === 0) {
        goodsGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    goodsGrid.innerHTML = goodsList.map(goods => renderGoodsCard(goods)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initSearchPage();
});

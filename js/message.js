// 消息页面JavaScript

function initMessagePage() {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }

    loadMessages();
}

function loadMessages() {
    const currentUser = getCurrentUser();
    const messages = JSON.parse(localStorage.getItem('xianyu_messages') || '[]');

    // 获取与当前用户相关的消息
    const myMessages = messages.filter(m =>
        m.fromUserId === currentUser.id || m.toUserId === currentUser.id
    );

    // 按时间倒序排列
    myMessages.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

    // 获取会话列表
    const conversations = getConversations(myMessages, currentUser.id);

    renderMessages(conversations);
}

function getConversations(messages, currentUserId) {
    const conversations = {};

    messages.forEach(msg => {
        const otherUserId = msg.fromUserId === currentUserId ? msg.toUserId : msg.fromUserId;
        const key = otherUserId;

        if (!conversations[key]) {
            const user = getUserById(otherUserId);
            conversations[key] = {
                userId: otherUserId,
                user: user,
                lastMessage: msg.content,
                lastTime: msg.createTime,
                goodsId: msg.goodsId
            };
        }
    });

    return Object.values(conversations);
}

function renderMessages(conversations) {
    const messageList = document.getElementById('messageList');

    const defaultAvatar = "images/icons/avatar1.svg";

    if (conversations.length === 0) {
        messageList.innerHTML = `
            <div class="empty-state">
                <div class="icon">💬</div>
                <p>暂无消息</p>
            </div>
        `;
        return;
    }

    messageList.innerHTML = conversations.map(conv => `
        <div class="message-item" onclick="openChat(${conv.userId})">
            <img class="message-avatar" src="${conv.user ? conv.user.avatar : defaultAvatar}" alt="头像" onerror="this.onerror=null;this.src='${defaultAvatar}'">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-name">${conv.user ? conv.user.nickname : '未知用户'}</span>
                    <span class="message-time">${formatDate(conv.lastTime)}</span>
                </div>
                <div class="message-preview">${conv.lastMessage}</div>
            </div>
        </div>
    `).join('');
}

function openChat(userId) {
    showToast('聊天功能开发中...', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
    initMessagePage();
});

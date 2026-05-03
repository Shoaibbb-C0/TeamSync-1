// FILE: script.js

// ==================== ROUTING SYSTEM ====================
const routes = {
    'home': 'page-home',
    'feed': 'page-feed',
    'hackathons': 'page-hackathons',
    'teammates': 'page-teammates',
    'profile': 'page-profile',
    'about': 'page-about'
};

// Initialize routing
function initRouter() {
    // Set default route
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
    
    // Handle route changes
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

function handleRouteChange() {
    const hash = window.location.hash.substring(1) || 'home';
    const pageId = routes[hash];
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav link
    updateActiveNavLink(hash);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateActiveNavLink(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.route === route) {
            link.classList.add('active');
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// ==================== FEED FUNCTIONALITY ====================
const mockPosts = [
    {
        name: 'Sarah Chen',
        avatar: '👩‍🎨',
        content: 'Looking for 2 developers for ETHGlobal 2024! We have a killer idea around decentralized identity. Need React + Solidity skills.',
        type: 'Looking for team',
        tags: ['Web3', 'React', 'Solidity'],
        time: '2 hours ago',
        likes: 12,
        comments: 5
    },
    {
        name: 'Mike Johnson',
        avatar: '🧑‍💼',
        content: 'UI/UX designer available for AI/ML hackathon. Have experience with data visualization and dashboard design. Let\'s connect!',
        type: 'Need members',
        tags: ['UI/UX', 'Design', 'AI'],
        time: '5 hours ago',
        likes: 8,
        comments: 3
    },
    {
        name: 'Raj Patel',
        avatar: '👨‍🔬',
        content: 'Our team just won 2nd place at the Climate Tech Hack! Big thanks to everyone who supported us. Check out our project on GitHub!',
        type: 'General',
        tags: ['Climate', 'IoT', 'Success'],
        time: '1 day ago',
        likes: 45,
        comments: 15
    }
];

function initFeed() {
    renderPosts();
    
    const createPostBtn = document.getElementById('createPostBtn');
    createPostBtn.addEventListener('click', createPost);
}

function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    mockPosts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    
    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${post.avatar}</div>
            <div class="post-info">
                <h4>${post.name}</h4>
                <span class="post-time">${post.time}</span>
            </div>
        </div>
        <p class="post-content">${post.content}</p>
        <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions">
            <button class="btn btn-secondary btn-small like-btn" data-liked="false">
                ❤️ Like (${post.likes})
            </button>
            <button class="btn btn-secondary btn-small">💬 Comment (${post.comments})</button>
        </div>
    `;
    
    // Add like functionality
    const likeBtn = postCard.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
        toggleLike(this, post);
    });
    
    return postCard;
}

function toggleLike(button, post) {
    const isLiked = button.dataset.liked === 'true';
    
    if (isLiked) {
        post.likes--;
        button.dataset.liked = 'false';
        button.style.background = '';
    } else {
        post.likes++;
        button.dataset.liked = 'true';
        button.style.background = 'rgba(255, 0, 100, 0.2)';
    }
    
    button.textContent = `❤️ Like (${post.likes})`;
}

function createPost() {
    const content = document.getElementById('postContent').value.trim();
    const type = document.getElementById('postType').value;
    const tagsInput = document.getElementById('postTags').value.trim();
    
    if (!content) {
        alert('Please enter post content');
        return;
    }
    
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
    
    const newPost = {
        name: 'Alex Kumar',
        avatar: '👨‍💻',
        content: content,
        type: type,
        tags: tags,
        time: 'Just now',
        likes: 0,
        comments: 0
    };
    
    // Add to beginning of posts array
    mockPosts.unshift(newPost);
    
    // Re-render posts
    renderPosts();
    
    // Clear form
    document.getElementById('postContent').value = '';
    document.getElementById('postTags').value = '';
    
    // Show success feedback
    showNotification('Post created successfully!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient);
        color: var(--bg-primary);
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ==================== PROFILE TABS ====================
function initProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and target content
            button.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });
}

// ==================== FILTER CHIPS ====================
function initFilterChips() {
    const chips = document.querySelectorAll('.chip');
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle active state
            chip.classList.toggle('active');
        });
    });
}

// ==================== VIEW TOGGLE ====================
function initViewToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const view = button.dataset.view;
            const grid = document.getElementById('hackathonsGrid');
            
            if (view === 'compact') {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
            }
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default for anchor links (not route links)
            if (href.startsWith('#') && !Object.keys(routes).includes(href.substring(1))) {
                e.preventDefault();
            }
        });
    });
}

// ==================== ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initMobileMenu();
    initFeed();
    initProfileTabs();
    initFilterChips();
    initViewToggle();
    initSmoothScroll();
    
    console.log('🚀 TeamSync initialized successfully!');
});

// ==================== UTILITY FUNCTIONS ====================
// Add active state to navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});
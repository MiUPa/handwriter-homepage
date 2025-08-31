// HandWriter Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 言語検出と多言語対応
    const isJapanese = navigator.language.startsWith('ja');
    
    // Chrome Web Store URL（後で実際のURLに更新）
    const chromeStoreUrl = 'https://chrome.google.com/webstore/detail/handwriter/your-extension-id';
    
    // Chrome Web Storeリンクを設定
    const chromeStoreButtons = document.querySelectorAll('#chromeStoreBtn, #finalCTA');
    chromeStoreButtons.forEach(button => {
        button.href = chromeStoreUrl;
        button.addEventListener('click', function(e) {
            // 分析トラッキング（Google Analytics等）
            gtag && gtag('event', 'click_chrome_store', {
                event_category: 'conversion',
                event_label: e.target.id
            });
        });
    });
    
    // スムーススクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer でアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .step, .pricing-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // デモアニメーション
    function animateHandwritingDemo() {
        const demoPaths = document.querySelectorAll('.demo-canvas path');
        demoPaths.forEach((path, index) => {
            setTimeout(() => {
                path.style.strokeDasharray = path.getTotalLength();
                path.style.strokeDashoffset = path.getTotalLength();
                path.style.animation = `drawPath 2s ease-in-out forwards`;
            }, index * 500);
        });
    }
    
    // CSS keyframes for drawing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawPath {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // デモアニメーションを開始
    setTimeout(animateHandwritingDemo, 1000);
    
    // 定期的にデモアニメーションを再実行
    setInterval(animateHandwritingDemo, 8000);
    
    // 多言語コンテンツ対応（将来の拡張用）
    const messages = {
        ja: {
            heroTitle: 'HandWriter',
            heroTagline: 'AI Chatbots with Handwriting',
            heroDescription: 'ChatGPT、Gemini、Claude等のAIチャットボットで自然な手書き入力を実現。従来の文字入力と最新のAI会話の完璧な融合。',
            chromeStoreBtn: 'Chromeに追加 - 無料',
            learnMore: '詳しく見る'
        },
        en: {
            heroTitle: 'HandWriter',
            heroTagline: 'AI Chatbots with Handwriting', 
            heroDescription: 'Transform your natural handwriting into digital text for ChatGPT, Gemini, Claude, and other AI chatbots. Experience the perfect blend of traditional writing and modern AI conversation.',
            chromeStoreBtn: 'Add to Chrome - Free',
            learnMore: 'Learn More'
        }
    };
    
    // 将来的な多言語切り替え機能
    function updateLanguage(lang) {
        const msg = messages[lang];
        // DOM更新ロジック（必要に応じて実装）
    }
    
    // パフォーマンス監視
    window.addEventListener('load', function() {
        // ページロード完了時の処理
        console.log('HandWriter homepage loaded successfully');
        
        // 分析データ送信
        gtag && gtag('event', 'page_view', {
            page_title: 'HandWriter Homepage',
            page_location: window.location.href
        });
    });
    
    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.error('HandWriter homepage error:', e.error);
        
        // エラー分析データ送信
        gtag && gtag('event', 'exception', {
            description: e.error?.message || 'Unknown error',
            fatal: false
        });
    });
});
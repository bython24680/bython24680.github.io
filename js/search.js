document.addEventListener('DOMContentLoaded', function() {
    // 取得 search.xml 路徑
    var searchPath = '/search.xml';
    if (typeof hexo_config !== 'undefined' && hexo_config.root) {
        searchPath = hexo_config.root + 'search.xml';
    }

    var input = document.getElementById('local-search-input');
    var resultContent = document.getElementById('local-search-result');

    // 如果沒有搜尋框，直接返回
    if (!input || !resultContent) return;

    // 載入 XML
    fetch(searchPath)
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            var posts = data.querySelectorAll('entry');
            
            input.addEventListener('input', function() {
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                var resultItems = [];
                
                if (this.value.trim().length <= 0) {
                    resultContent.innerHTML = '';
                    return;
                }

                posts.forEach(function(post) {
                    var title = post.querySelector('title').textContent;
                    var content = post.querySelector('content').textContent;
                    var url = post.querySelector('url').textContent;
                    
                    var data_title = title.trim().toLowerCase();
                    var data_content = content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var isMatch = false;

                    // 簡單的關鍵字匹配
                    keywords.forEach(function(keyword) {
                        if (data_title.indexOf(keyword) !== -1 || data_content.indexOf(keyword) !== -1) {
                            isMatch = true;
                        }
                    });

                    if (isMatch) {
                        resultItems.push({
                            title: title,
                            content: content,
                            url: url
                        });
                    }
                });

                // 渲染結果
                if (resultItems.length === 0) {
                    resultContent.innerHTML = '<div class="text-center text-slate-400 py-8">沒有找到相關文章</div>';
                } else {
                    var html = '<ul class="space-y-3">';
                    resultItems.forEach(function(item){
                        // 確保 URL 正確
                        var itemUrl = item.url;
                        if (typeof hexo_config !== 'undefined' && hexo_config.root && !itemUrl.startsWith(hexo_config.root)) {
                             // 簡單處理，實際情況視 search.xml 生成方式而定
                        }

                        html += `<li class="search-result-item">
                            <a href="${itemUrl}">
                                <div class="search-result-item__title">${item.title}</div>
                                <p class="search-result-item__content">${item.content.replace(/<[^>]+>/g,"").substring(0, 80)}...</p>
                            </a>
                        </li>`;
                    });
                    html += '</ul>';
                    resultContent.innerHTML = html;
                }
            });
        })
        .catch(e => {
            console.error('Search fetch error:', e);
            resultContent.innerHTML = '<div class="text-center text-slate-400 py-8 text-sm">無法載入搜尋索引 (search.xml)<br>請確認已安裝 hexo-generator-searchdb</div>';
        });
});
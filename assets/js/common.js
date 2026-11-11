(function(){
    // Theme setup
    var r=document.documentElement,tb=document.getElementById('theme');
    function sys(){return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
    var t=null;try{t=localStorage.getItem('theme')}catch(e){}
    if(t!=='light'&&t!=='dark')t=null;
    function apply(m){r.setAttribute('data-theme',m);tb.textContent=m==='dark'?'☀️':'🌙';tb.setAttribute('aria-label',m==='dark'?'Ganti ke tema terang':'Ganti ke tema gelap')}
    apply(t||sys());
    tb.addEventListener('click',function(){var n=r.getAttribute('data-theme')==='dark'?'light':'dark';apply(n);try{localStorage.setItem('theme',n)}catch(e){}});

    // Helper functions
    window.gawean = {
        toast: function(m) {
            var e=document.getElementById('toast');
            e.textContent=m;e.classList.add('show');
            setTimeout(function(){e.classList.remove('show')},2600)
        },
        formatRp: function(n) { return 'Rp '+n.toLocaleString('id-ID') },
        initAvatar: function() {
            try {
                var savedName = localStorage.getItem('gawean_nama');
                if (savedName) {
                    var firstName = savedName.trim().split(' ')[0];
                    var av = document.getElementById('avatar-initial');
                    if(av) av.textContent = firstName.charAt(0).toUpperCase();
                }
            } catch(e) {}
        }
    };

    document.addEventListener('click',function(e){
        var b=e.target.closest('[data-toast]');
        if(b) window.gawean.toast(b.dataset.toast)
    });
})();

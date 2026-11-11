(function(){
    window.gawean.initAvatar();
    var rp = window.gawean.formatRp;

    try {
        var savedName = localStorage.getItem('gawean_nama');
        if (savedName) {
            var firstName = savedName.trim().split(' ')[0];
            var el = document.getElementById('hi-mitra');
            if(el) el.textContent = 'Halo, ' + firstName + ' 👋';
        }
    } catch(e) {}

    var aktif=[{t:'Antri di resto, Menteng',m:'Hari ini, 18.00',s:'Dikerjakan',c:'',p:35000},{t:'Like dan komen 20 postingan',m:'Dikirim 2 jam lalu',s:'Menunggu dicek',c:'wait',p:50000},{t:'Rapikan data 200 baris',m:'Revisi sampai besok',s:'Perlu revisi',c:'rev',p:90000}];
    var rek=[{id:1,t:'Desain poster promo kopi',k:'Online',p:120000,m:'Bisa dari mana saja'},{id:2,t:'Antar dokumen ke kantor pos',k:'Di lokasi',p:40000,m:'Dekat lokasimu'},{id:3,t:'Terjemahkan 3 halaman EN ke ID',k:'Online',p:150000,m:'Tenggat 2 hari'},{id:4,t:'Bantu pindahan kos',k:'Di lokasi',p:200000,m:'Sabtu pagi'},{id:5,t:'Edit video 1 menit',k:'Online',p:175000,m:'Tenggat 3 hari'}];
    var filter='all';

    function renderM(){
        var mList = document.getElementById('m-list');
        var mAktif = document.getElementById('m-aktif');
        var mRek = document.getElementById('m-rek');

        if(mList) mList.innerHTML=aktif.map(function(a){return '<div class="item"><div><div class="t">'+a.t+'</div><div class="m">'+a.m+'</div></div><div class="r"><span class="chip '+a.c+'">'+a.s+'</span><span class="price">'+rp(a.p)+'</span></div></div>'}).join('');
        if(mAktif) mAktif.textContent=aktif.length;

        var l=rek.filter(function(x){return filter==='all'||x.k===filter});
        if(mRek) mRek.innerHTML=l.length?l.map(function(x){return '<div class="item"><div><div class="t">'+x.t+'</div><div class="m"><span class="chip">'+x.k+'</span> '+x.m+'</div></div><div class="r"><span class="price">'+rp(x.p)+'</span><button class="btn sm" type="button" data-take="'+x.id+'">Ambil</button></div></div>'}).join(''):'<div class="empty">Belum ada kerjaan di kategori ini.</div>';
    }

    document.addEventListener('click',function(e){
        var f=e.target.closest('[data-f]');
        if(f){
            filter=f.dataset.f;
            document.querySelectorAll('[data-f]').forEach(function(b){b.setAttribute('aria-pressed',b===f)});
            renderM();
            return;
        }
        var tk=e.target.closest('[data-take]');
        if(tk){
            var id=+tk.dataset.take, x=rek.filter(function(y){return y.id===id})[0];
            rek=rek.filter(function(y){return y.id!==id});
            aktif.unshift({t:x.t,m:x.m,s:'Dikerjakan',c:'',p:x.p});
            renderM();
            window.gawean.toast('Kerjaan diambil. Dana Klien sudah ditahan.');
            return;
        }
    });

    renderM();
})();

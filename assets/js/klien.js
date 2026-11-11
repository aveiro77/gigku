(function(){
    window.gawean.initAvatar();
    var rp = window.gawean.formatRp;

    try {
        var savedName = localStorage.getItem('gawean_nama');
        if (savedName) {
            var firstName = savedName.trim().split(' ')[0];
            var el = document.getElementById('hi-klien');
            if(el) el.textContent = 'Halo, ' + firstName + ' 👋';
        }
    } catch(e) {}

    var rev=[{id:1,t:'Like dan komen 20 postingan',w:'Dewi A.',m:'Dikirim 2 jam lalu',p:50000},{id:2,t:'Rapikan data 200 baris',w:'Raka P.',m:'Revisi dikirim 1 jam lalu',p:90000}];
    var posted=[{t:'Foto 15 produk kue',s:'Terbuka',c:'',m:'6 pelamar',p:300000,hold:true},{t:'Terjemahkan 3 halaman',s:'Berjalan',c:'',m:'Dikerjakan Mitra',p:150000,hold:true},{t:'Antri tiket konser',s:'Selesai',c:'',m:'Dana sudah cair',p:100000,hold:false}];

    function renderK(){
        var kRev = document.getElementById('k-rev');
        var kList = document.getElementById('k-list');
        var kDana = document.getElementById('k-dana');
        var kJalan = document.getElementById('k-jalan');
        var kCek = document.getElementById('k-cek');

        if(kRev) kRev.innerHTML=rev.length?rev.map(function(x){return '<div class="item"><div><div class="t">'+x.t+'</div><div class="m">'+x.w+' · '+x.m+'</div></div><div class="r"><span class="price">'+rp(x.p)+'</span><div class="acts"><button class="btn alt sm" type="button" data-rv="'+x.id+'">Minta revisi</button><button class="btn sm" type="button" data-ok="'+x.id+'">Setujui</button></div></div></div>'}).join(''):'<div class="empty">Semua hasil kerja sudah dicek. 🎉</div>';
        if(kList) kList.innerHTML=posted.map(function(a){return '<div class="item"><div><div class="t">'+a.t+'</div><div class="m">'+a.m+'</div></div><div class="r"><span class="chip '+(a.s==='Selesai'?'':'wait')+'">'+a.s+'</span><span class="price">'+rp(a.p)+'</span></div></div>'}).join('');
        
        var dana=0,jalan=0;
        posted.forEach(function(a){if(a.hold){dana+=a.p;jalan++}});
        rev.forEach(function(x){dana+=x.p});

        if(kDana) kDana.textContent=rp(dana);
        if(kJalan) kJalan.textContent=jalan+rev.length;
        if(kCek) kCek.textContent=rev.length;
    }

    document.addEventListener('click',function(e){
        var ok=e.target.closest('[data-ok]');
        if(ok){
            var i=+ok.dataset.ok, y=rev.filter(function(z){return z.id===i})[0];
            rev=rev.filter(function(z){return z.id!==i});
            renderK();
            window.gawean.toast('Disetujui. '+rp(Math.round(y.p*.85))+' diteruskan ke '+y.w);
            return;
        }
        var rv=e.target.closest('[data-rv]');
        if(rv){
            var j=+rv.dataset.rv, z=rev.filter(function(q){return q.id===j})[0];
            rev=rev.filter(function(q){return q.id!==j});
            renderK();
            window.gawean.toast('Permintaan revisi dikirim ke '+z.w+'. Dana tetap ditahan.');
        }
    });

    renderK();
})();

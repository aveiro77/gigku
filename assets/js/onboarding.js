(function(){
    var S={step:0,role:null,picks:[]},
    steps=document.querySelectorAll('.step'),
    bars=document.querySelectorAll('#bar i'),
    next=document.getElementById('next'),
    back=document.getElementById('back'),
    nav=document.getElementById('nav');

    var cats={
        mitra:['Antri & titip','Media sosial','Desain','Edit video','Fotografi','Mengajar','Input data','Penerjemahan','Pindahan','Acara'],
        klien:['Antri & titip','Media sosial','Desain','Edit video','Fotografi','Mengajar','Input data','Penerjemahan','Pindahan','Acara']
    };

    function ok(){
        if(S.step===0) return !!S.role;
        if(S.step===1){
            var namaVal = document.getElementById('nama').value.trim();
            if(namaVal) {
                try { localStorage.setItem('gawean_nama', namaVal); } catch(err) {}
            }
            return namaVal.length>1 && /^(\+62|62|0)8\d{7,12}$/.test(document.getElementById('hp').value.replace(/[\s-]/g,'')) && !!document.getElementById('kota').value;
        }
        if(S.step===2) return S.picks.length>0;
        return true;
    }

    function render(){
        steps.forEach(function(s,i){s.classList.toggle('show',i===S.step)});
        bars.forEach(function(b,i){b.classList.toggle('on',i<=S.step)});
        back.hidden=S.step===0||S.step===3;
        nav.style.display=S.step===3?'none':'flex';
        next.textContent=S.step===2?'Selesai':'Lanjut';
        next.disabled=!ok();

        if(S.step===2){
            document.getElementById('t2').textContent=S.role==='klien'?'Kerjaan apa yang biasanya kamu butuhkan?':'Pilih bidang yang kamu minati';
            var c=document.getElementById('chips');
            c.innerHTML='';
            cats[S.role].forEach(function(n){
                var b=document.createElement('button');
                b.type='button';
                b.className='chip';
                b.textContent=n;
                b.setAttribute('aria-pressed',S.picks.indexOf(n)>-1);
                b.addEventListener('click',function(){
                    var i=S.picks.indexOf(n);
                    if(i>-1) S.picks.splice(i,1);
                    else S.picks.push(n);
                    b.setAttribute('aria-pressed',i===-1);
                    next.disabled=!ok();
                });
                c.appendChild(b);
            });
        }

        if(S.step===3){
            var namaInput = document.getElementById('nama').value.trim();
            var firstName = namaInput ? namaInput.split(' ')[0] : 'Sari';
            document.getElementById('hi').textContent = firstName;
            document.getElementById('s3').textContent = S.role==='klien'?'Kamu bisa langsung memposting kerjaan pertamamu dan memilih Mitra yang cocok.':'Kamu bisa langsung melihat kerjaan yang tersedia dan mengambil yang cocok denganmu.';
            document.getElementById('go-dash').href = 'home-' + S.role + '.html';
        }
        window.scrollTo(0,0);
    }

    document.querySelectorAll('.opt').forEach(function(o){
        o.addEventListener('click',function(){
            S.role=o.dataset.role;
            S.picks=[];
            document.querySelectorAll('.opt').forEach(function(x){x.setAttribute('aria-pressed',x===o)});
            next.disabled=false;
        });
    });

    ['nama','hp','kota'].forEach(function(id){
        var e=document.getElementById(id);
        if(e){
            e.addEventListener('input',function(){next.disabled=!ok()});
            e.addEventListener('change',function(){next.disabled=!ok()});
        }
    });

    next.addEventListener('click',function(){
        if(!ok()) return;
        S.step++;
        render();
    });

    back.addEventListener('click',function(){
        if(S.step>0){S.step--;render();}
    });

    render();
})();

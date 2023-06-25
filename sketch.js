let lvla = 0
let pa = 0
let apa = 0
bb=[0.0000,"LEEF"]
let pbutton
let lvlbutton
let apbutton
let alvlbutton
let lbutton;
let abutton
let regbutton;
let sendbutton;
let aregbutton;
let asendbutton;
let slider

const { rpc } = link

function setup() {
    fsize = windowWidth * 0.02
    fsizeh = windowHeight * 0.02
	bsizew=windowWidth*0.1
bsizeh=windowHeight*0.05
  createCanvas(windowWidth, windowHeight);
  background(100);
  lbutton = createButton('Cloud');
    lbutton.position(windowWidth * 0.4, windowHeight*0.5);
    lbutton.size(bsizew, bsizeh)
    lbutton.style('background-color', '#ddaa00')
    lbutton.style('color', '#ffffee')
    lbutton.mousePressed(login)
    abutton = createButton('Anchor');
    abutton.style('background-color', '#0044aa')
    abutton.style('color', '#eeffff')
    abutton.position(windowWidth * 0.6, windowHeight*0.5);
    abutton.size(bsizew,bsizeh)
    abutton.mousePressed(alogin)
    st = createP()
    st.position(windowWidth*0.5 , 10)
    
    st1 = createP()
    st1.position(10, windowHeight*0.50 )
    st2 = createP()
    st2.position(10, windowHeight * 0.60)
    st3 = createP()
    st3.position(windowWidth * 0.90, windowHeight * 0.90)
    st4 = createP()
    st4.position(windowWidth * 0.10, windowHeight * 0.90)
    valueDisplayer3 = createP()
    valueDisplayer3.position(10, windowHeight * 0.40)
        valueDisplayer3 = createP()
    valueDisplayer3.position(10, windowHeight*0.40)
    valueDisplayer2 = createP()
    valueDisplayer2.position(10, windowHeight*0.30 )
    valueDisplayer = createP()
    valueDisplayer.position(10, windowHeight*0.20)
    valueDisplayer1 = createP()
    valueDisplayer1.position(10, windowHeight*0.01 )

    valueDisplayer.style('font-size', fsize + 'px')
    valueDisplayer1.style('font-size', fsize + 'px')
    valueDisplayer2.style('font-size', fsize + 'px')
    valueDisplayer3.style('font-size', fsize + 'px')
    st.style('font-size', fsize + 'px')
    st1.style('font-size', fsize + 'px')
    st2.style('font-size', fsize + 'px')
    st3.style('font-size', fsize + 'px')
    st4.style('font-size', fsize + 'px')
    valueDisplayer.style('color', '#eeffff')
    valueDisplayer1.style('color', '#eeffff')
    valueDisplayer2.style('color', '#eeffff')
    valueDisplayer3.style('color', '#eeffff')
    st.style('color', '#eeffff')
    st1.style('color', '#eeffff')
    st2.style('color', '#eeffff')
    st3.style('color', '#eeffff')
    st4.style('color', '#eeffff')

}



let session

// tries to restore session, called when document is loaded
function restoreSession() {
    link.restoreSession(identifier).then((result) => {
        session = result
        if (session) {
            didLogin()
        }
    })
}

// login and store session if sucessful
async function alogin() {
    try {
        link.login(identifier).then((result) => {
            session = result.session
            didLogin()
            abal()


        })
    } catch (e) { alert(JSON.stringify(e.message)) }
}

// logout and remove session from storage
function alogout() {
    document.body.classList.remove('logged-in')
    session.remove()
}

// called when session was restored or created
function didLogin() {
    if (session) {

    }
}
async function abal() {
    res = await session.client.v1.chain.get_table_rows(
        { "code": "leefmaincorp", "scope": session.auth.actor, "table": "accounts" })
    if (res.rows.length > 0) {
        bal = res.rows[0].balance
    } else { bal = "0.0000 LEEF" }
    bb=bal.split(" ")
    if (!slider) {
        slider = createSlider(0, Number(bb[0]), 100);
        slider.position(10, windowHeight * 0.32);
        slider.style('width', fsize*10 + 'px');
    }
    asendbutton = createButton('Send leef');
    asendbutton.size(bsizew, bsizeh)
    asendbutton.position(40, windowHeight * 0.35);
    asendbutton.mousePressed(axp) 

    }
async function axp() {


        const result = await link.transact({
            actions: [{
                account: 'leefmaincorp',
                name: 'transfer',
                authorization: [{
                    actor: session.auth.actor,
                    permission: 'active',
                }],
                data: {
                    from: session.auth.actor,
                    to: 'nftsclvldrop',
                    quantity: slider.value() + ".0000 LEEF",
                    memo: 'stock'
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

    
  
   abal()
}

async function xp() {

    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'leefmaincorp',
                name: 'transfer',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    from: wax.userAccount,
                    to: 'nftsclvldrop',
                    quantity: slider.value()+".0000 LEEF",
                    memo:'stock'
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        alert(JSON.stringify(result))
    } catch (e) {
        alert(JSON.stringify(e.message))
    }
    leef = await wax.rpc.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": s })
    if (leef.rows.length > 0){
        bal = leef.rows[0].balance
    } else { bal = "0.0000 LEEF" }
}

async function alvlup() {


        const result = await link.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'lvlup',
                authorization: [{
                    actor: session.auth.actor,
                    permission: 'active',
                }],
                data: {
                    username: session.auth.actor
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

    
   
}

async function lvlup() {

    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'lvlup',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    username: wax.userAccount
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        alert(JSON.stringify(result))
    } catch (e) {
        alert(JSON.stringify(e.message))
    }
}

async function apup() {

   
        const result = await link.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'prestigeup',
                authorization: [{
                    actor: session.auth.actor,
                    permission: 'active',
                }],
                data: {
                    username: session.auth.actor,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        
   
}

async function pup() {

    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'prestigeup',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    username: wax.userAccount
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        alert(JSON.stringify(result))
    } catch (e) {
        alert(JSON.stringify(e.message))
    }
}


async function areg() {

  
        const result = await link.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'reg',
                authorization: [{
                    actor: session.auth.actor,
                    permission: 'active',
                }],
                data: {
                    username: session.auth.actor
                },
            }, {
                account: 'leefmaincorp',
                name: 'transfer',
                authorization: [{
                    actor: session.auth.actor,
                    permission: 'active',
                }],
                data: {
                    from: session.auth.actor,
                    to: 'nftsclvldrop',
                    quantity: "1.0000 LEEF",
                    memo: 'start'
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });


    abal();

}


async function reg() {

    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'nftsclvldrop',
                name: 'reg',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    username: wax.userAccount
                },
            }, {
                    account: 'leefmaincorp',
                    name: 'transfer',
                    authorization: [{
                        actor: wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        from: wax.userAccount,
                        to: 'nftsclvldrop',
                        quantity: "1.0000 LEEF",
                        memo: 'start'
                    },
                }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        alert(JSON.stringify(result))
    } catch (e) {
        alert(JSON.stringify(e.message))
    }
    leef = await wax.rpc.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": s })
    if (leef.rows.length > 0){
        bal = leef.rows[0].balance
    } else {bal= "0.0000 LEEF" }

    }
async function login() {
    try {
        const userAccount = await wax.login();
        s = userAccount;
        leef = await wax.rpc.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": s })
        if (leef.rows.length > 0){
            bal = leef.rows[0].balance
            bs = bal.split(" ")
        } else {
            bal = "0.0000 LEEF"
            bs = 0.0000
        }
        
        slider = createSlider(0, Number(bs[0]), 100);
        slider.position(10, windowHeight * 0.32);
        slider.style('width', fsize*10 + 'px');
        sendbutton = createButton('Send leef');
        sendbutton.position(40, windowHeight * 0.35);
        sendbutton.mousePressed(xp)
        sendbutton.size(bsizew, bsizeh)
        leef = await wax.rpc.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": s })
        if (leef.rows.length > 0){
            bal = leef.rows[0].balance
        } else { bal = "0.0000 LEEF" }
    } catch (e) {
        textSize(32);
        alert(e.message, 100, 100);
        fill(100, 102, 153);
    }
}

async function draw() {
    if (wax.api) {
        leefmax = await wax.rpc.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": 'nftsclvldrop' })
        lef = leefmax.rows[0].balance.split(" ")
        leff = lef[0]
        

        textSize(20);
        
        fill(100, 102, 153);
        valueDisplayer1.html(s)

        stock = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "stocklist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })
        userb = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "lvllist", "scope": "nftsclvldrop","limit":1000})
        base = Number((leff / (365 * 24 * 60 * 60)) / (userb.rows.length * 1000000)).toFixed(12)
        st4.html('BASE: '+base)

        if (stock.rows.length > 0) {
            ss = stock.rows[0]

     if (stock.rows.length===0){  
			if (!regbutton){
			regbutton = createButton('register');
                regbutton.position(200, 0);
                regbutton.size(bsizew, bsizeh)
            regbutton.mousePressed(reg)}}
            if (ss.isstaked === 1) {
				
				if (regbutton){
			regbutton.remove()}
                valueDisplayer.html('you are sending ' + slider.value() + ' LEEF to nftsclvldrop')


                valueDisplayer3.html('Current Leef Bal: ' + bal)




                lvl = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "lvllist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })
                utime = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "timelist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })

                ll = lvl.rows[0].lvl
                utimer = 10 * (ll-1)
                dd = new Date();
                t = Number(dd.getTime() / 1000).toFixed(0);
                ll = lvl.rows[0].lvl
                utimer = 10 * (ll - 1)
                uo = base * (ll ** (ll / 10))
                tim = Number((utime.rows[0].time + utimer) - t).toFixed(0)
                if (tim < 0) { tim = 0.00 }

                st3.html('timer: ' + tim+" secs");
                n = 0
                n1 = 0.0001
                for (i = 0; i < ll; i++) {
                    n2 = n + n1
                    n = n1
                    n1 = n2

                }
                le = ss.stock.split(' ')
                if (Number(le[0]) >= Number(n2)) {
                    lvlbutton = createButton('Level Up');
                    lvlbutton.position(200, windowHeight * 0.35)
                    lvlbutton.size(bsizew, bsizeh)
                    lvlbutton.mousePressed(lvlup)
                    lvla = 1
                } else {
                    if (lvla === 1) {
                        lvlbutton.remove();
                        lvla = 0
                    }
                }
                xp = Number(le[0]) / Number(n2)
                if (xp > 1) { xp = 1 }
                st.html('Current stock: ' + ss.stock + '/' + Number(n2).toFixed(4) + " LEEF");
                noFill()
                rect(windowWidth * 0.50, windowHeight * 0.1, windowWidth * 0.45, windowHeight * 0.05, 50, 50, .5, 0)

                fill(255)
                rect(windowWidth * 0.50, windowHeight * 0.1, windowWidth * 0.45*xp, windowHeight * 0.05, 50, 50, .5, 0)

                st1.html('Current lvl: ' + ll);
                p = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "prestigelist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })
                ppl = 60
                if (p.rows.length > 0) {
                    pp = p.rows[0].lvl
                    st2.html('Current Prestige: ' + pp);
                    ppl = ppl + pp
                } else {
                    st2.html('Current Prestige: 0');

                }
                if (ll >= ppl) {
                    pbutton = createButton('Time to Prestige!!!');
                    pbutton.position(200, 400)
                    pbutton.size(bsizew, bsizeh)
                    pbutton.mousePressed(pup)
                    pa = 1
                } else {
                    if (pa === 1) {
                        pbutton.remove();
                        pa = 0
                    }
                }

            } else {

                regbutton = createButton('register');
                regbutton.position(200, 0);
                regbutton.size(bsizew, bsizeh)
                regbutton.mousePressed(reg)
            }
        } else {
            regbutton = createButton('register');
            regbutton.position(200, 0);
            regbutton.size(bsizew, bsizeh)
            regbutton.mousePressed(reg)
}
        lbutton.remove();
        abutton.remove();
    }
    if (session) {
        leefmax = await session.client.v1.chain.get_table_rows({ "code": "leefmaincorp", "table": "accounts", "scope": 'nftsclvldrop' })
        lef = leefmax.rows[0].balance.split(" ")
        leff = lef[0]
        userb = await session.client.v1.chain.get_table_rows({ "code": "nftsclvldrop", "table": "lvllist", "scope": "nftsclvldrop","limit":1000 })
        base = Number(leff / (365 * 24 * 60 * 60) / (userb.rows.length * 1000000)).toFixed(12)
        st4.html('BASE: '+ base);
        textSize(20);

        fill(100, 102, 153);
        valueDisplayer1.html(session.auth.actor)

 
        lbutton.remove();
        abutton.remove();
        if (!slider) {
            abal()
        }
        valueDisplayer3.html('Current Leef Bal: ' + bal)
        stock = await session.client.v1.chain.get_table_rows(
            { "code": "nftsclvldrop", "scope": "nftsclvldrop", "lower_bound": session.auth.actor, "upper_bound": session.auth.actor, "table": "stocklist" })
        ss = stock.rows[0]
        if (stock.rows.length===0){  
			if (!aregbutton){
			aregbutton = createButton('register');
                aregbutton.position(200, 0);
                aregbutton.size(bsizew, bsizeh)
            aregbutton.mousePressed(areg)}}
        if (ss.isstaked === 1) {
         	if (aregbutton){
			aregbutton.remove()}

            valueDisplayer.html('you are sending ' + slider.value() + ' LEEF to nftsclvldrop')
          

            valueDisplayer3.html('Current Leef Bal: ' + bal)




            lvl = await session.client.v1.chain.get_table_rows({ "code": "nftsclvldrop", "table": "lvllist", "scope": "nftsclvldrop", "lower_bound": session.auth.actor, "upper_bound": session.auth.actor })
            utime = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "timelist", "scope": "nftsclvldrop", "lower_bound": session.auth.actor, "upper_bound": session.auth.actor })
            dd = new Date();
            t = Number(dd.getTime()/1000).toFixed(0);
            ll = lvl.rows[0].lvl
            utimer = 10 * (ll-1)
            tim = Number((utime.rows[0].time + utimer) - t).toFixed()
            if (tim < 0) { tim = 0.00 }


            st3.html('timer: ' + tim + " secs");
            n = 0
            n1 = 0.0001
            for (i = 0; i < ll; i++) {
                n2 = n + n1
                n = n1
                n1 = n2

            }
            le = ss.stock.split(' ')
            if (Number(le[0]) >= Number(n2)) {
                alvlbutton = createButton('Level Up');
                alvlbutton.position(200, windowHeight * 0.35)
                alvlbutton.size(bsizew, bsizeh)
                alvlbutton.mousePressed(alvlup)
                lvla = 1
            } else {
                if (lvla === 1) {
                    alvlbutton.remove();
                    lvla = 0
                }
            }
            xp = Number(le[0]) / Number(n2)
            if (xp > 1) { xp=1}
            st.html('Current stock: ' + ss.stock + '/' + Number(n2).toFixed(4) + " LEEF");
            st1.html('Current lvl: ' + ll);
            noFill()
            rect(windowWidth * 0.50, windowHeight * 0.1, windowWidth * 0.45, windowHeight * 0.05, 50, 50, .5, 0)
            fill(255)
            rect(windowWidth * 0.50, windowHeight * 0.1, windowWidth * 0.45 * xp, windowHeight * 0.05, 50, 50, .5, 0)

 
            
            p = await session.client.v1.chain.get_table_rows({ "code": "nftsclvldrop", "table": "prestigelist", "scope": "nftsclvldrop", "lower_bound": session.auth.actor, "upper_bound": session.auth.actor })
            ppl = 60
            if (p.rows.length > 0) {
                pp = p.rows[0].lvl
                st2.html('Current Prestige: ' + pp);
                ppl = ppl + pp
            } else {
                st2.html('Current Prestige: 0');

            }
            if (ll >= ppl) {
                apbutton = createButton('Time to Prestige!!!');
                apbutton.position(200, 400)
                apbutton.size(bsizew, bsizeh)
                apbutton.mousePressed(apup)
                apa = 1
            } else {
                if (apa === 1) {
                    apbutton.remove();
                    pa = 0
                }
            }

        } else {

            aregbutton = createButton('register');
            aregbutton.position(200, 0);
            aregbutton.size(bsizew, bsizeh)
            aregbutton.mousePressed(areg)
        }
    } else {
       
    }

        
      
    }


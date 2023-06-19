let lvla=0
let pa = 0
let pbutton
let lvlbutton
let lbutton;
let abutton
let regbutton;
let sendbutton;
const { rpc } = link
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  lbutton = createButton('Wax Cloud Login');
    lbutton.position(0, 0);
    lbutton.mousePressed(login)
 
    st = createP()
    st.position(10, 100)
    st1 = createP()
    st1.position(10, 120)
    st2 = createP()
    st2.position(10, 140)
    valueDisplayer3 = createP()
    valueDisplayer3.position(10, 300)
    valueDisplayer2 = createP()
    valueDisplayer2.position(10, 40)
    valueDisplayer = createP()
    valueDisplayer.position(10, 180)
    valueDisplayer1 = createP()
    valueDisplayer1.position(10, 20)
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
    link.login(identifier).then((result) => {
        session = result.session
        didLogin()
 
         
        
    })
   
}

// logout and remove session from storage
function alogout() {
    document.body.classList.remove('logged-in')
    session.remove()
}

// called when session was restored or created
function didLogin() {
    if (session) {
        async function bal() {
            await session.client.v1.chain.get_table_rows({ "code": "leefmaincorp", "scope": session.auth.actor, "table": "accounts" }).then((res) => { 
            alert(res)})
        }bal()
    }
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
        slider.position(10, 220);
        slider.style('width', '80px');
        sendbutton = createButton('Send leef');
        sendbutton.position(40, 250);
        sendbutton.mousePressed(xp)
        
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
        textSize(20);
        
        fill(100, 102, 153);
        valueDisplayer1.html(s)
        let url = 'https://wax.eosphere.io/v1/chain/get_table_rows'
        stock = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "stocklist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })
        if (stock.rows.length > 0) {
            ss = stock.rows[0]


            if (ss.isstaked === 1) {
                valueDisplayer.html('you are sending ' + slider.value() + ' LEEF to nftsclvldrop')


                valueDisplayer3.html('Current Leef Bal: ' + bal)




                lvl = await wax.rpc.get_table_rows({ "code": "nftsclvldrop", "table": "lvllist", "scope": "nftsclvldrop", "lower_bound": s, "upper_bound": s })
                ll = lvl.rows[0].lvl
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
                    lvlbutton.position(200, 250)
                    lvlbutton.mousePressed(lvlup)
                    lvla = 1
                } else {
                    if (lvla === 1) {
                        lvlbutton.remove();
                        lvla = 0
                    }
                }
                st.html('Current stock: ' + ss.stock + '/' + Number(n2).toFixed(4) + " LEEF");
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
                    plbutton.mousePressed(pup)
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
                regbutton.mousePressed(reg)
            }
        } else {
            regbutton = createButton('register');
            regbutton.position(200, 0);
            regbutton.mousePressed(reg)
}
        lbutton.remove();
        abutton.remove();
    }
    if (session) {
        
        textSize(20);

        fill(100, 102, 153);
        valueDisplayer1.html(session.auth.actor)
   
        lbutton.remove();
        abutton.remove();


        } else {
        }
      
    }


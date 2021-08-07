const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $('.tab-item.active');
const line = $('.tabs .line');

line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';



tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = (function () {
        $('.tab-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');

        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';


        pane.classList.add('active');
        this.classList.add('active');

    });
})

//  start randum_user

const members = (() => {
    const listMembers = [{ nameMember: 'ThinhNguyen', emailMember: 'Thinhnguyenvan772@gmail.com' },{ nameMember: 'NhatNgo', emailMember: '__@gmail.com' },{ nameMember: 'UyNgo', emailMember: '__@gmail.com' }];
    let renderMembers = $('#members');
    let btnRandum = $('.btn-outline-primary.btn_randum');
    let createMembers = $('#btn_create'); 

    return {
        add(name) {
            listMembers.push(name);
        },
        delete(index) {
            listMembers.splice(index, 1);
        },
        render() {
            let sort = 1;
            var htmls = listMembers.map((member, index) =>
                ` 
                    <tr>
                        <th scope="row">${sort++}</th>
                        <td>${member.nameMember}</td>
                        <td>${member.emailMember}</td>
                        <td data-index="${index}" class="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                         </td>
                        </tr> 
                `
            ).join('');
            renderMembers.innerHTML = htmls;
        },
        handleDelete(e) {
            let btnDelete = e.target.closest('.delete');
            if (btnDelete) {
                let index = btnDelete.dataset.index;
                this.delete(index);
                this.render();
            }
        },
        init() {
            let name = $('#fullname');
            let email = $('#email');
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let isName, isEmail;

            btnRandum.onclick = () => {
                var valueRandom = $('.randum_user');
                let randum = Math.floor((Math.random() * listMembers.length));
                valueRandom.value = listMembers[randum].nameMember;
            }
            email.onblur = () => {
                let vEmail = $('#email').value;
                let message = email.parentElement.querySelector('.form-message');
                if (!regex.test(vEmail)) {
                    message.innerHTML = "Vui lòng nhập đúng cú pháp !";
                } else {
                    message.innerHTML = null;
                    isEmail = true;
                }
            }
            name.onblur = () => {
                let vName = $('#fullname').value;
                let message = name.parentElement.querySelector('.form-message');
                if (vName.length < 2) {
                    message.innerHTML = "Vui lòng nhập tối thiếu 2 ký tự !!";
                    isName = false;
                } else {
                    message.innerHTML = null;
                    isName = true;
                }
            }
            createMembers.onclick = () => {
                let vName = $('#fullname').value;
                let vEmail = $('#email').value;

                if (isEmail && isName) {
                    this.add({ nameMember: vName, emailMember: vEmail });
                    alert("Sign Up Success ");
                    name.value = null;
                    email.value = null;
                    this.render();
                }

            }
            renderMembers.onclick = this.handleDelete.bind(this);

            this.render();
        }
    }
})();
members.init();

function toSpans(span) {
    var str = span.firstChild.data;
    var a = str.length;
    span.removeChild(span.firstChild);
    for (var i = 0; i < a; i++) {
        var theSpan = document.createElement("SPAN");
        theSpan.appendChild(document.createTextNode(str.charAt(i)));
        span.appendChild(theSpan);
    }
}

function RainbowSpan(span, hue, deg, brt, spd, hspd) {
    this.deg = (deg == null ? 360 : Math.abs(deg));
    this.hue = (hue == null ? 0 : Math.abs(hue) % 360);
    this.hspd = (hspd == null ? 3 : Math.abs(hspd) % 360);
    this.length = span.firstChild.data.length;
    this.span = span;
    this.speed = (spd == null ? 50 : Math.abs(spd));
    this.hInc = this.deg / this.length;
    this.brt = (brt == null ? 255 : Math.abs(brt) % 256);
    this.timer = null;
    toSpans(span);
    this.moveRainbow();
}
RainbowSpan.prototype.moveRainbow = function () {
    if (this.hue > 359) this.hue -= 360;
    var color;
    var b = this.brt;
    var a = this.length;
    var h = this.hue;

    for (var i = 0; i < a; i++) {

        if (h > 359) h -= 360;

        if (h < 60) { color = Math.floor(((h) / 60) * b); red = b; grn = color; blu = 0; }
        else if (h < 120) { color = Math.floor(((h - 60) / 60) * b); red = b - color; grn = b; blu = 0; }
        else if (h < 180) { color = Math.floor(((h - 120) / 60) * b); red = 0; grn = b; blu = color; }
        else if (h < 240) { color = Math.floor(((h - 180) / 60) * b); red = 0; grn = b - color; blu = b; }
        else if (h < 300) { color = Math.floor(((h - 240) / 60) * b); red = color; grn = 0; blu = b; }
        else { color = Math.floor(((h - 300) / 60) * b); red = b; grn = 0; blu = b - color; }

        h += this.hInc;

        this.span.childNodes[i].style.color = "rgb(" + red + ", " + grn + ", " + blu + ")";
    }
    this.hue += this.hspd;
}
var r1=document.getElementById("r1"); //get span to apply rainbow
    var myRainbowSpan=new RainbowSpan(r1, 0, 360, 255, 50, 18); //apply static rainbow effect
    myRainbowSpan.timer=window.setInterval("myRainbowSpan.moveRainbow()", myRainbowSpan.speed);

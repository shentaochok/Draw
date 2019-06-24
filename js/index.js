(function () {
    function $_(name) {
        return document.querySelector(name);
    }
    class Draw {
        constructor(opt) {
            let defaultopt = {
                el: ".zd_round img",//转动的元素
                btn: ".pointer", //点击转动的元素
                count: 3, //转盘转动的圈数,
                chance: {
                    1: "40%",
                    5: "40%", //指定抽奖概率，其余则平分
                },
                num: 8,//转盘的总个数
                innerTime: 4000 //转盘转动的时间
            }
            opt = Object.assign({}, defaultopt, opt);
            this.init(opt);
        }
        init(opt) {
            let { el, chance, count, num, btn, innerTime ,endFunc} = opt;
            let numArray = Object.keys(chance);
            this.residue = [];
            for (let i = 0; i < num; i++) {
                if (!numArray.includes(String(i))) {
                    this.residue.push(i)
                }
            }
            this.pos = this.getNum(chance);   //确定转盘最后停留的位置
            this.deg = 360 / num;
            this.rotate(el, count, btn, innerTime,endFunc);
        }
        getNum(chance) {
            let n1 = Math.round(Math.random() * 100);
            let start = 0, end = 0;
            for (let key in chance) {
                end = start + parseInt(chance[key]);
                if (n1 > start && n1 < end) {
                    return key;
                }
                start = end;
            }
            //如果配置的概率没有抽中，则剩下的商品概率评分
            let rad = Math.floor(Math.random() * (this.residue.length));
            return this.residue[rad];
        }
        rotate(el, count, btn, innerTime,endFunc) {
            var endPos = (count * 360 - this.deg / 2) + (this.pos * this.deg) + Math.random() * this.deg / 2 + 10;
            var btn = $_(btn);
            var el = $_(el);
            btn.onclick = () => {
                this.aniamte(el, endPos,innerTime);
            }
            el.addEventListener("transitionend", this.end.bind(this,endFunc), false);
        }
        aniamte(el, endPos, innerTime) {
            el.style.transform = "rotate(" + endPos + "deg)";
            el.style.transition = "all " + innerTime + "ms linear";
        }
        end(endFunc) {
            endFunc&&endFunc(this.pos);
        }
    }
    window.Draw=Draw;
})();

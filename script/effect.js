$(window).load(function() {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});
$('document').ready(function() {

    function showconfetti(str) {
        if (str == 'yes') {
            const giftbox = document.getElementById('merrywrap');
            const canvasC = document.getElementById('c');

            const config = {
                birthdate: 'August 25, 2021',
                name: 'ZUBIYA'
            };

            function hideEverything() {
                giftbox.style.display = 'none';
                canvasC.style.display = 'none';
            }

            hideEverything();

            $('#confetti').css('display', 'initial')
            const confettiSettings = { target: 'confetti' };
            const confetti = new window.ConfettiGenerator(confettiSettings);
            confetti.render();


            const second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;

            let countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
            x = setInterval(function() {


                let w = (c.width = window.innerWidth + 20),
                    h = (c.height = window.innerHeight + 70),
                    ctx = c.getContext('2d'),
                    hw = w / 2 + 25, // half-width
                    hh = h / 2,
                    opts = {
                        strings: ['HAPPYhbbkhj', 'BIRTHDAYj jn h!', config.name],
                        charSize: 30,
                        charSpacing: 30,
                        lineHeight: 40,

                        cx: w / 2,
                        cy: h / 2,

                        fireworkPrevPoints: 10,
                        fireworkBaseLineWidth: 5,
                        fireworkAddedLineWidth: 8,
                        fireworkSpawnTime: 200,
                        fireworkBaseReachTime: 30,
                        fireworkAddedReachTime: 30,
                        fireworkCircleBaseSize: 20,
                        fireworkCircleAddedSize: 10,
                        fireworkCircleBaseTime: 30,
                        fireworkCircleAddedTime: 30,
                        fireworkCircleFadeBaseTime: 10,
                        fireworkCircleFadeAddedTime: 5,
                        fireworkBaseShards: 5,
                        fireworkAddedShards: 5,
                        fireworkShardPrevPoints: 3,
                        fireworkShardBaseVel: 4,
                        fireworkShardAddedVel: 2,
                        fireworkShardBaseSize: 3,
                        fireworkShardAddedSize: 3,
                        gravity: 0.1,
                        upFlow: -0.1,
                        letterContemplatingWaitTime: 360,
                        balloonSpawnTime: 20,
                        balloonBaseInflateTime: 10,
                        balloonAddedInflateTime: 10,
                        balloonBaseSize: 20,
                        balloonAddedSize: 20,
                        balloonBaseVel: 0.4,
                        balloonAddedVel: 0.4,
                        balloonBaseRadian: -(Math.PI / 2 - 0.5),
                        balloonAddedRadian: -1
                    },
                    calc = {
                        totalWidth: opts.charSpacing *
                            Math.max(opts.strings[0].length, opts.strings[1].length)
                    },
                    Tau = Math.PI * 2,
                    TauQuarter = Tau / 4,
                    letters = [];

                ctx.font = 0 + 'px Verdana';

                function Letter(char, x, y) {
                    this.char = char;
                    this.x = x;
                    this.y = y;

                    this.dx = -ctx.measureText(char).width / 2;
                    this.dy = +opts.charSize / 2;

                    this.fireworkDy = this.y - hh;

                    let hue = (x / calc.totalWidth) * 360;

                    this.color = 'hsl(hue,80%,50%)'.replace('hue', hue);
                    this.lightAlphaColor = 'hsla(hue,80%,light%,alp)'.replace('hue', hue);
                    this.lightColor = 'hsl(hue,80%,light%)'.replace('hue', hue);
                    this.alphaColor = 'hsla(hue,80%,50%,alp)'.replace('hue', hue);

                    this.reset();
                }
                Letter.prototype.reset = function() {
                    this.phase = 'firework';
                    this.tick = 0;
                    this.spawned = false;
                    this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
                    this.reachTime =
                        (opts.fireworkBaseReachTime +
                            opts.fireworkAddedReachTime * Math.random()) |
                        0;
                    this.lineWidth =
                        opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
                    this.prevPoints = [
                        [0, hh, 0]
                    ];
                };
                Letter.prototype.step = function() {
                    if (this.phase === 'firework') {
                        if (!this.spawned) {
                            ++this.tick;
                            if (this.tick >= this.spawningTime) {
                                this.tick = 0;
                                this.spawned = true;
                            }
                        } else {
                            ++this.tick;

                            let linearProportion = this.tick / this.reachTime,
                                armonicProportion = Math.sin(linearProportion * TauQuarter),
                                x = linearProportion * this.x,
                                y = hh + armonicProportion * this.fireworkDy;

                            if (this.prevPoints.length > opts.fireworkPrevPoints)
                                this.prevPoints.shift();

                            this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

                            let lineWidthProportion = 1 / (this.prevPoints.length - 1);

                            for (let i = 1; i < this.prevPoints.length; ++i) {
                                let point = this.prevPoints[i],
                                    point2 = this.prevPoints[i - 1];

                                ctx.strokeStyle = this.alphaColor.replace(
                                    'alp',
                                    i / this.prevPoints.length
                                );
                                ctx.lineWidth = point[2] * lineWidthProportion * i;
                                ctx.beginPath();
                                ctx.moveTo(point[0], point[1]);
                                ctx.lineTo(point2[0], point2[1]);
                                ctx.stroke();
                            }

                            if (this.tick >= this.reachTime) {
                                this.phase = 'contemplate';

                                this.circleFinalSize =
                                    opts.fireworkCircleBaseSize +
                                    opts.fireworkCircleAddedSize * Math.random();
                                this.circleCompleteTime =
                                    (opts.fireworkCircleBaseTime +
                                        opts.fireworkCircleAddedTime * Math.random()) |
                                    0;
                                this.circleCreating = true;
                                this.circleFading = false;

                                this.circleFadeTime =
                                    (opts.fireworkCircleFadeBaseTime +
                                        opts.fireworkCircleFadeAddedTime * Math.random()) |
                                    0;
                                this.tick = 0;
                                this.tick2 = 0;

                                this.shards = [];

                                let shardCount =
                                    (opts.fireworkBaseShards +
                                        opts.fireworkAddedShards * Math.random()) |
                                    0,
                                    angle = Tau / shardCount,
                                    cos = Math.cos(angle),
                                    sin = Math.sin(angle),
                                    x = 1,
                                    y = 0;

                                for (let i = 0; i < shardCount; ++i) {
                                    let x1 = x;
                                    x = x * cos - y * sin;
                                    y = y * cos + x1 * sin;

                                    this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
                                }
                            }
                        }
                    } else if (this.phase === 'contemplate') {
                        ++this.tick;

                        if (this.circleCreating) {
                            ++this.tick2;
                            let proportion = this.tick2 / this.circleCompleteTime,
                                armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                            ctx.beginPath();
                            ctx.fillStyle = this.lightAlphaColor
                                .replace('light', 50 + 50 * proportion)
                                .replace('alp', proportion);
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
                            ctx.fill();

                            if (this.tick2 > this.circleCompleteTime) {
                                this.tick2 = 0;
                                this.circleCreating = false;
                                this.circleFading = true;
                            }
                        } else if (this.circleFading) {
                            ctx.fillStyle = this.lightColor.replace('light', 70);
                            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                            ++this.tick2;
                            let proportion = this.tick2 / this.circleFadeTime,
                                armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                            ctx.beginPath();
                            ctx.fillStyle = this.lightAlphaColor
                                .replace('light', 100)
                                .replace('alp', 1 - armonic);
                            ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
                            ctx.fill();

                            if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
                        } else {
                            ctx.fillStyle = this.lightColor.replace('light', 70);
                            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
                        }

                        for (let i = 0; i < this.shards.length; ++i) {
                            this.shards[i].step();

                            if (!this.shards[i].alive) {
                                this.shards.splice(i, 1);
                                --i;
                            }
                        }

                        if (this.tick > opts.letterContemplatingWaitTime) {
                            this.phase = 'balloon';

                            this.tick = 0;
                            this.spawning = true;
                            this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
                            this.inflating = false;
                            this.inflateTime =
                                (opts.balloonBaseInflateTime +
                                    opts.balloonAddedInflateTime * Math.random()) |
                                0;
                            this.size =
                                (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

                            let rad =
                                opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
                                vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

                            this.vx = Math.cos(rad) * vel;
                            this.vy = Math.sin(rad) * vel;
                        }
                    } else if (this.phase === 'balloon') {
                        ctx.strokeStyle = this.lightColor.replace('light', 80);

                        if (this.spawning) {
                            ++this.tick;
                            ctx.fillStyle = this.lightColor.replace('light', 70);
                            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                            if (this.tick >= this.spawnTime) {
                                this.tick = 0;
                                this.spawning = false;
                                this.inflating = true;
                            }
                        } else if (this.inflating) {
                            ++this.tick;

                            let proportion = this.tick / this.inflateTime,
                                x = (this.cx = this.x),
                                y = (this.cy = this.y - this.size * proportion);

                            ctx.fillStyle = this.alphaColor.replace('alp', proportion);
                            ctx.beginPath();
                            generateBalloonPath(x, y, this.size * proportion);
                            ctx.fill();

                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(x, this.y);
                            ctx.stroke();

                            ctx.fillStyle = this.lightColor.replace('light', 70);
                            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                            if (this.tick >= this.inflateTime) {
                                this.tick = 0;
                                this.inflating = false;
                            }
                        } else {
                            this.cx += this.vx;
                            this.cy += this.vy += opts.upFlow;

                            ctx.fillStyle = this.color;
                            ctx.beginPath();
                            generateBalloonPath(this.cx, this.cy, this.size);
                            ctx.fill();

                            ctx.beginPath();
                            ctx.moveTo(this.cx, this.cy);
                            ctx.lineTo(this.cx, this.cy + this.size);
                            ctx.stroke();

                            ctx.fillStyle = this.lightColor.replace('light', 70);
                            ctx.fillText(
                                this.char,
                                this.cx + this.dx,
                                this.cy + this.dy + this.size
                            );

                            if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw)
                                this.phase = 'done';
                        }
                    }
                };

                function Shard(x, y, vx, vy, color) {
                    let vel =
                        opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

                    this.vx = vx * vel;
                    this.vy = vy * vel;

                    this.x = x;
                    this.y = y;

                    this.prevPoints = [
                        [x, y]
                    ];
                    this.color = color;

                    this.alive = true;

                    this.size =
                        opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
                }
                Shard.prototype.step = function() {
                    this.x += this.vx;
                    this.y += this.vy += opts.gravity;

                    if (this.prevPoints.length > opts.fireworkShardPrevPoints)
                        this.prevPoints.shift();

                    this.prevPoints.push([this.x, this.y]);

                    let lineWidthProportion = this.size / this.prevPoints.length;

                    for (let k = 0; k < this.prevPoints.length - 1; ++k) {
                        let point = this.prevPoints[k],
                            point2 = this.prevPoints[k + 1];

                        ctx.strokeStyle = this.color.replace('alp', k / this.prevPoints.length);
                        ctx.lineWidth = k * lineWidthProportion;
                        ctx.beginPath();
                        ctx.moveTo(point[0], point[1]);
                        ctx.lineTo(point2[0], point2[1]);
                        ctx.stroke();
                    }

                    if (this.prevPoints[0][1] > hh) this.alive = false;
                };

                function generateBalloonPath(x, y, size) {
                    ctx.moveTo(x, y);
                    ctx.bezierCurveTo(
                        x - size / 2,
                        y - size / 2,
                        x - size / 4,
                        y - size,
                        x,
                        y - size
                    );
                    ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
                }

                function anim() {
                    window.requestAnimationFrame(anim);

                    ctx.fillStyle = 'rgba(0,0,0)';

                    ctx.fillRect(0, 0, w, h);

                    ctx.translate(hw, hh);

                    let done = true;
                    for (let l = 0; l < letters.length; ++l) {
                        letters[l].step();
                        if (letters[l].phase !== 'done') done = false;
                    }

                    ctx.translate(-hw, -hh);

                    if (done)
                        for (let l = 0; l < letters.length; ++l) letters[l].reset();
                }

                for (let i = 0; i < opts.strings.length; ++i) {
                    for (let j = 0; j < opts.strings[i].length; ++j) {
                        letters.push(
                            new Letter(
                                opts.strings[i][j],
                                j * opts.charSpacing +
                                opts.charSpacing / 2 -
                                (opts.strings[i].length * opts.charSize) / 2,
                                i * opts.lineHeight +
                                opts.lineHeight / 2 -
                                (opts.strings.length * opts.lineHeight) / 2
                            )
                        );
                    }
                }

                window.addEventListener('resize', function() {
                    w = c.width = window.innerWidth + 20;
                    h = c.height = window.innerHeight + 70;

                    hw = w / 2;
                    hh = h / 2;

                    ctx.font = 0 + 'px Verdana';
                });



                giftbox.style.display = 'initial';
                clearInterval(x);
                let merrywrap = document.getElementById('merrywrap');
                // let box = merrywrap.getElementsByClassName('giftbox')[0];
                let step = 1;
                let stepMinutes = [2000, 2000, 1000, 1000];

                // function init() {
                //     box.addEventListener('click', openBox, false);
                //     box.addEventListener('click', showfireworks, false);
                // }

                function stepClass(step) {
                    merrywrap.className = 'merrywrap';
                    merrywrap.className = 'merrywrap step-' + step;
                }

                function openBox() {
                    if (step === 1) {
                        // box.removeEventListener('click', openBox, false);
                    }
                    stepClass(step);
                    if (step === 3) {
                        // canvasC.style.display = 'none';
                    }
                    if (step === 4) {
                        return;
                    }
                    setTimeout(openBox, stepMinutes[step - 1]);
                    step++;
                    //   setTimeout(anim, 1900);
                }

                function showfireworks() {
                    canvasC.style.display = 'initial';
                    // canvasC.style.height = '100px';
                    setTimeout(anim, 1500);
                }

                openBox();
                showfireworks();



                // if (distance < 0) {
                //     clearInterval(x);
                //     console.log("happy birthday");
                // }
            }, second);

        } else {
            $('#confetti').css('display', 'initial')
            const confettiSettings = { target: 'confetti' };
            const confetti = new window.ConfettiGenerator(confettiSettings);
            confetti.render();


        }
    }

    var vw;
    $(window).resize(function() {
        vw = $(window).width() / 2;
        if (vw > 380) {
            $('#b11').animate({ top: 240, left: vw - 350 }, 500);
            $('#b22').animate({ top: 240, left: vw - 250 }, 500);
            $('#b33').animate({ top: 240, left: vw - 150 }, 500);
            $('#b44').animate({ top: 240, left: vw - 50 }, 500);
            $('#b55').animate({ top: 240, left: vw + 50 }, 500);
            $('#b66').animate({ top: 240, left: vw + 150 }, 500);
            $('#b77').animate({ top: 240, left: vw + 250 }, 500);
        } else {
            $('#b11').animate({ top: 200, left: vw - 135 }, 500);
            $('#b22').animate({ top: 200, left: vw - 85 }, 500);
            $('#b33').animate({ top: 200, left: vw - 35 }, 500);
            $('#b44').animate({ top: 200, left: vw + 15 }, 500);
            $('#b55').animate({ top: 200, left: vw + 65 }, 500);
            $('#b66').animate({ top: 200, left: vw + 115 }, 500);
            $('#b77').animate({ top: 200, left: vw + 15 }, 500);
        }
    });

    // showconfetti()

    $('#turn_on').click(function() {




        // showconfetti();
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');
        $('body').addClass('peach');
        $('#king').fadeIn('slow').delay(5000);
        $(this).fadeOut('slow').delay(5000).promise().done(function() {
            $('#play').fadeIn('slow');
        });
        return false;
    });
    $('#play').click(function() {
        var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');
        $('body').css('backgroud-color', '#FFF');
        $('body').addClass('peach-after');
        // $('#guitarman').css('display', 'block');
        $('#guitarman').fadeIn('slow').delay(5000);
        $(this).fadeOut('slow').delay(6000).promise().done(function() {
            $('#bannar_coming').fadeIn('slow');
        });
    });

    $('#bannar_coming').click(function() {
        $('#king').fadeOut('slow').delay(2000);

        $('.bannar').addClass('bannar-come');
        $(this).fadeOut('slow').delay(6000).promise().done(function() {
            $('#balloons_flying').fadeIn('slow');
        });
    });

    function loopOne() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b1').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopOne();
        });
    }

    function loopTwo() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b2').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopTwo();
        });
    }

    function loopThree() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b3').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopThree();
        });
    }

    function loopFour() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b4').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopFour();
        });
    }

    function loopFive() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b5').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopFive();
        });
    }

    function loopSix() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b6').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopSix();
        });
    }

    function loopSeven() {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $('#b7').animate({ left: randleft, bottom: randtop }, 10000, function() {
            loopSeven();
        });
    }

    $('#balloons_flying').click(function() {
        $('.balloon-border').animate({ top: -500 }, 8000);
        $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
        $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
        // $('#b3').addClass('balloons-rotate-behaviour-two');
        // $('#b4').addClass('balloons-rotate-behaviour-one');
        // $('#b5').addClass('balloons-rotate-behaviour-one');
        // $('#b6').addClass('balloons-rotate-behaviour-two');
        // $('#b7').addClass('balloons-rotate-behaviour-one');
        loopOne();
        loopTwo();
        loopThree();
        loopFour();
        loopFive();
        loopSix();
        loopSeven();

        $(this).fadeOut('slow').delay(5000).promise().done(function() {
            $('#cake_fadein').fadeIn('slow');
        });
    });

    $('#cake_fadein').click(function() {
        $('.cake').fadeIn('slow');
        $(this).fadeOut('slow').delay(3000).promise().done(function() {
            $('#light_candle').fadeIn('slow');
        });
    });

    $('#light_candle').click(function() {
        $('.fuego').fadeIn('slow');
        $(this).fadeOut('slow').promise().done(function() {
            $('#wish_message').fadeIn('slow');
        });
    });
    $('#blow_candle').click(function() {

        $('.fuego').fadeOut('slow').delay(4000);
        $(this).fadeOut('slow').delay(4000).promise().done(function() {
            $('#story').fadeIn('slow');
        });
    });

    $('#wish_message').click(function() {
        vw = $(window).width() / 2;
        showconfetti('yes');

        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b1').attr('id', 'b11');
        $('#b2').attr('id', 'b22')
        $('#b3').attr('id', 'b33')
        $('#b4').attr('id', 'b44')
        $('#b5').attr('id', 'b55')
        $('#b6').attr('id', 'b66')
        $('#b7').attr('id', 'b77')
        if (vw > 380) {
            $('#b11').animate({ top: 240, left: vw - 350 }, 500);
            $('#b22').animate({ top: 240, left: vw - 250 }, 500);
            $('#b33').animate({ top: 240, left: vw - 150 }, 500);
            $('#b44').animate({ top: 240, left: vw - 50 }, 500);
            $('#b55').animate({ top: 240, left: vw + 50 }, 500);
            $('#b66').animate({ top: 240, left: vw + 150 }, 500);
            $('#b77').animate({ top: 240, left: vw + 250 }, 500);
            $('.balloons').css('opacity', '0.9');
            $('.balloons h2').fadeIn(3000);
        } else {
            $('#b11').animate({ top: 200, left: vw - 135 }, 500);
            $('#b22').animate({ top: 200, left: vw - 85 }, 500);
            $('#b33').animate({ top: 200, left: vw - 35 }, 500);
            $('#b44').animate({ top: 200, left: vw + 15 }, 500);
            $('#b55').animate({ top: 200, left: vw + 65 }, 500);
            $('#b66').animate({ top: 200, left: vw + 115 }, 500);
            $('#b77').animate({ top: 200, left: vw + 15 }, 500);
            $('.balloons').css('opacity', '0.9');
            $('.balloons h2').fadeIn(3000);
        }
        $(this).fadeOut('slow').delay(3000).promise().done(function() {
            setInterval(() => {
                $('#c').css('display', 'none')
            }, 10000);
            setTimeout(() => {
                $('#blow_candle').fadeIn('slow');
            }, 10000);


        });
    });


    $('#story').click(function() {

        $(this).fadeOut('slow');

        $('.cake').fadeOut('fast').promise().done(function() {
            $('.message').fadeIn('slow');
        });

        var i;

        function msgLoop(i) {
            $("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function() {
                i = i + 1;
                $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
                if (i == 50) {
                    $("p:nth-child(49)").fadeOut('slow').promise().done(function() {
                        $('.cake').fadeIn('fast');
                        setInterval(() => {
                            $('#end_card').fadeIn('slow');
                        }, 2000);
                    });

                } else {
                    msgLoop(i);
                }

            });
            // body...
        }

        msgLoop(0);

    });
    $('#end_card').click(function() {
        window.location = 'card.html'
    });
});




//alert('hello');
/**
 * @depend lib/Dequeue.js
 * @depend lib/Vector.js
 * @depend lib/test.js
 */
var VelocityBot = function () {

    SERIES_MAX_SIZE = 5;

    var _history = [];
    var _history_topics = [];

    var _future = [];
    var _future_topics = [];

    function store(subject, values) {

        var idx = _history_topics.indexOf(subject);
        if (idx < 0) {

            idx = _history_topics.length;
            _history_topics.push(subject);

            var fifo = new Dequeue();
            history.push(fifo);
        }

        history[idx].push(value);

        if (history.length != history_topics.length) {

            alert('I Quit.');
        }
    }

    function history(subject, amount) {
    }

    tagpro.ready(function () {
        if (!tagpro.playerId) {
            return setTimeout(VelocityBot, 200);
        }

        var SocketPacketFilter = function (filter, func) {
            return function (object) { if (filter in object) func(object); }
        };
        tagpro.socket.on("p", new SocketPacketFilter('u', observer));

        sEmit = tagpro.socket.emit;
        tagpro.socket.emit = function () {
            //console.log("Emit:", arguments[0], arguments[1]);
            return sEmit.apply(this, arguments);
        }

    });

    console.log('yey');
};
//    tagpro.ready(function () {
//
//        if (!tagpro.playerId) {
//            return setTimeout(TB_Velocity, 200);
//        }
//
//        var OBSERVE_INTERVAL_MS = 200;
//        var PREDICT_INTERVAL_MS = 200;
//        var DRAW_INTERVAL_MS = 200;
//
//
//        var PXpS_Multiplier = 100;
//
//        var COLOR_THRESHOLD = {
//            //PXpS
//            '0': "rgba(0, 255, 24, 0.8)",
//            '15': "rgba(255, 176, 24, 0.8)",
//            '25': "rgba(245, 135, 136, 0.8)",
//            '30': "rgba(255, 255, 24, 0.8)"
//        };
//        var BORDER_THRESHOLD = {
//            '0': "rgba(0,    255, 24, 0.9)",
//            '15': "rgba(255, 174, 0,  0.9);",
//            '25': "rgba(255, 119, 0,  0.9)",
//            '30': "rgba(255, 0,   0,  0.9)"
//        };
//
//        function colorize(THRESHOLD, PXpS) {
//
//            var key = THRESHOLD[0];
//            for (var keys = Object.keys(THRESHOLD); keys.length > 0;) {
//                key = keys.shift();
//                if (keys.length >= 0 && PXpS > keys[0]) continue;
//                else break;
//            }
//
//            return THRESHOLD[key];
//        }
//
//        function draw_screen() {
//            self.cache.update();
//
//            var PXpS = Magnitude_Velocity * 100;
//            tagpro.prettyText(PXpS.toFixed(1), 26, 27, colorize(COLOR_THRESHOLD, PXpS), false, false, self.cache.context);
//        }
//
//        var self = tagpro.players[tagpro.playerId],
//            name = self.name;
//
//        // Pixels per Second.
//        var PXpS = 0;
//
//        // time starts at 0
//        var time = 0;
//        var last_time = 0;
//
//        var xD = 0,
//            yD = 0;
//
//        var pos_x = 0,
//            pos_y = 0,
//            last_x = 0,
//            last_y = 0;
//
//        var distance_x = 0,
//            distance_y = 0;
//
//        var screen_cache_busy = false;
//        var Magnitude_Velocity = 0.0,
//            Velocity_Direction = 0;
//
//        var tagproUiDraw = tagpro.ui.draw;
//        tagpro.ui.draw = function (e) {
//
//            if (xD == 0 && yD == 0) return;
//
//            var PXpS = Magnitude_Velocity * 100;
//            var SIZE_MODIFIER = Magnitude_Velocity;
//
//            // Visual Angle
//            e.restore();
//            e.save();
//            e.translate(viewPort.width / 2, viewPort.height / 2);
//            e.rotate(self.angle);
//            e.beginPath();
//            e.rect(20, -3, 6, 6);
//            e.fillStyle = "rgba(0, 255, 0, 0.3)";
//            e.strokeStyle = "rgba(100, 255, 25, 1)";
//            e.lineWidth = 1 / tagpro.zoom;
//            e.fill();
//            e.stroke();
//
//            // Visual Momentum (Magnitude Vector Velocity Direction(atleast I think))
//            e.restore();
//            e.save();
//            e.translate(viewPort.width / 2, viewPort.height / 2);
//            e.rotate(Velocity_Direction - Math.PI * 180);
//
//            e.fillStyle = colorize(COLOR_THRESHOLD, PXpS);
//            e.strokeStyle = colorize(BORDER_THRESHOLD, PXpS);
//
//            e.lineWidth = 1.5 * (Magnitude_Velocity * 10) / tagpro.zoom;
//            e.beginPath();
//            e.moveTo(-10 / tagpro.zoom, -8 / tagpro.zoom);
//
//
//            if (PXpS > 25) SIZE_MODIFIER = 25 / 100;
//            SIZE_MODIFIER = SIZE_MODIFIER * .6;
//            e.lineTo(8 * (0.9 + SIZE_MODIFIER * 10) / tagpro.zoom, 0);
//            e.lineTo(-10 / tagpro.zoom, 8 / tagpro.zoom);
//            e.closePath();
//            e.fill();
//            e.stroke();
//            e.restore();
//
//            // Last and Current Direction Key-Press
//            e.save();
//            e.translate(viewPort.width / 2, viewPort.height / 2);
//            e.rotate(Math.atan2(yD, xD));
//            e.fillStyle = "rgba(0, 0, 0, 0.1)";
//            e.lineWidth = 1.5 / tagpro.zoom;
//            e.beginPath();
//            e.moveTo(21 / tagpro.zoom, -7 / tagpro.zoom);
//            e.lineTo(28 / tagpro.zoom, 0);
//            e.lineTo(21 / tagpro.zoom, 7 / tagpro.zoom);
//            e.closePath();
//            e.fill();
//            e.stroke();
//            e.restore();
//
//            return tagproUiDraw.apply(this, arguments);
//        };
//        function getAngle(X1, Y1, X2, Y2) {
//            if (Y2 == Y1) {
//                return (X1 > X2) ? Math.PI : 0;
//            }
//            if (X2 == X1) {
//                return (Y2 > Y1) ? Math.PI / 2 : 1.5 * Math.PI;
//            }
//            var tangent = (X2 - X1) / (Y2 - Y1);
//            var ang = Math.atan(tangent);
//            if (Y2 - Y1 < 0) ang -= Math.PI;
//            return ang;
//        }
//
//
//        function observer_calc() {
//
//            last_time = time;
//            time = Date.now();
//
//            distance_x = pos_x - last_x;
//            distance_y = pos_y - last_y;
//
//            var Avg_Velocity_X = (distance_x / (time - last_time));
//            var Avg_Velocity_Y = (distance_y / (time - last_time));
//
//            var Squared_Avg_Velocity_X = Math.pow(Avg_Velocity_X, 2);
//            var Squared_Avg_Velocity_Y = Math.pow(Avg_Velocity_Y, 2);
//
//            Magnitude_Velocity = Math.sqrt(Squared_Avg_Velocity_X + Squared_Avg_Velocity_Y);
//
//            distance_x = pos_x - last_x;
//            distance_y = pos_y - last_y;
//            Velocity_Direction = Math.atan2(distance_y, distance_x);
//
//            //console.log ('pos x: ' + pos_x + ' pos y: ' + pos_y);
//            //console.log ('distance x: ' + distance_x + ' distance y: ' + distance_y);
//            //console.log ('Avg_Velocity_X: ' + Avg_Velocity_X + ' Avg_Velocity_Y: ' + Avg_Velocity_Y);
//
//            if (self.up) yD = -1;
//            if (self.left) xD = -1;
//            if (self.down) yD = 1;
//            if (self.right) xD = 1;
//
//            last_x = pos_x;
//            last_y = pos_y;
//        }
//
//        /**build/
//            speed = (position() - lastPosition) / (time-last_time);
//            future_position = position()+(future_time-time)*speed;
//         */
//        function predictor_calc () {
//            var PXpS = Magnitude_Velocity * 100;
//            console.log (PXpS);
//
//        }
//
//        Object.observe(self, function (changes) {
//            changes.forEach(function (change) {
//                pos_x = change.object.x;
//                pos_y = change.object.y;
//
//                console.log(self);
//            });
//        });
//        setInterval(observer_calc, OBSERVE_INTERVAL_MS);
//        setInterval(predictor_calc, PREDICT_INTERVAL_MS);
//        setInterval(draw_screen, DRAW_INTERVAL_MS);
//    });
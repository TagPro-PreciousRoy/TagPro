function Axis () {}
Axis.prototype.X = "x";
Axis.prototype.Y = "y";

function Point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Velocity is a vector physical quantity; both magnitude and direction are required to define it.
 * The scalar absolute value (magnitude) of velocity is called "speed",
 *                                                      a quantity that is measured in metres per second (m/s or m.
 */


/**
 * @return {number}
 */
Point.prototype.distanceOf = function (axis, point) {
    if (axis != Point.X || axis != Point.Y) alert('axis != Point.X && axis != Point.Y');
    if (!point instanceof Point) alert('point is not instanceof Point');

    return point[axis] - this[axis];
};

/*                   unit=px            0=angle tangent                                       |'.     ."Hypotenuse"
        |                                           ,                     "Adjacent" ........ (0)'.  .
       -*-= arrow                              "Hypotenuse"     *                             |    '.
        |                                             .         |                             |_     '.
                                                 5     .       /|                             |_|______'.
                                                        .     / |(vy)                              .
*                                                        .   /  |                                  .
y|                                                4        . /  A|                              "opposite"
|                                                          /    |
|          *                                             v/     |
|     *   /                                      3       /      |......."Opposite",sine
| vy..|  /..v                                           /       |
|     | /                                              /        |                                      "Hypotenuse"
|     |/____*                                    2    /..       |                                |'.     .
|           .                                        /   '.(0)__|                   "Opposite"...|  '.  .
|           .                                       /C    '  |  |                                |    '.
___|___________vx_________x                      *- 1 /_____.'__|B_|-*                              |_     '.
*- 0|                      -*                          1  .2   3(vx)4                                |_|___(0)'.
|                                                     .         |                                    .
*                                                     .         *                                    .
                                                 "Adjacent"                                     "Adjacent"
                                                      ,
                                                    cos


                                                           -*
                                        "component form" = v = (4,5)
                                              /
                                             / Magnitude vs X =
                                            /  Magnitude vs Y
                                           /
     "Relation between Magnitude and the components of the vector."

              adjacent side        Vx
    cos(0)=   ______________  =   _____
               Hypotenuse          v


              opposite side        Vx                                                       r r r r = 4
    sin(0)=   _____________   =   ____
               Hypotenuse          v                                                     r(square Root)
                                                                           4 |  8 | 12 |[16]|
                                                                           --|----|----|----|
     Vx  = v cos(0)                                                        3 |  6 | r9 | 12 |
     Vy  = v sin(0)                                                        --|----|----|----|
                                                                           2 | r4 |  6 |  8 |
                                                                           --|----|----|----|
  |V|Magnitude = c "square root" = A[length] squared +                     1r|  2 |  3 |  4 |
                                         B[length] squared)

                                 2   2                                                 +
|V|Magnitude = "Square root of" A + B                                                                r r r r r = 5

                                                                                                      r(square Root)
                                                                                   5 | 10 | 15 | 20 |[25]|
                 _ _ _ _   _        r r r r r r = 6                                --|----|----|----|----|
                |_|_|_|_| |_|                                                      4 |  8 | 12 |r16 | 20 |
                 _ _ _ _   _ _                                                     --|----|----|----|----|
                |_|_|_|_| |_|r|                                                    3 |  6 | r9 | 12 | 15 |
                |_|_|_|_| |r|_|                                                    --|----|----|----|----|
                |_|_|_|r| |_|_|                                                    2 | r4 |  6 |  8 | 10 |
                |_|_|r|_| |_|_|                                                    --|----|----|----|----|
                 _ _ _ _   _ _                                                     1r|  2 |  3 |  4 |  5 |
                |_|r|_|_| |_|_|
                |r|_|_|_| |_|_|

         25 - 16 = 11
         11 - 16 = [-5]

                                2   2
     |V|px = "Square root of"  4 + 5
                      --   --
     |V|px = "Square root of" 16 + 25

     |V|px = "Square root of" 41 = 6.4031

                          Vy        5
(0)=angle=theta=tangent = ---- =tan  -  = tan 1.25 = (0)3.00
                          Vx        4

     Vx  = v cos (0)


 */

//       'component 1'
//             |
//   -*     /  v  , v   \
//   v   =      x    y
//          \           /
//                   |
//             'component 2'

function Vector(P, Q, theta) {
    if (theta == undefined) theta = null;

    // P=Point
    this.P = P;

    // Q=End Point
    this.Q = Q;

    this.THETA = theta;

    this._magnitude = null;
}
Vector.prototype.theta = function () {
    if (theta == undefined) {

        this.THETA = Math.atan2(this.Q.distanceOf(this.P, Axis.X), this.Q.distanceOf(this.P, Axis.Y));
    }
    return this.THETA;
};

/**
 * Magnitude = Distance of whole vector. or length?
 * @return {number}
 */
Vector.prototype.Magnitude = function () {

    if (this._magnitude == null)
        this._magnitude = (Math.pow(this.Q.x - this.P.x, 2) + Math.pow(this.Q.y - this.P.y, 2));

    return this._magnitude;
};
Vector.prototype.length = Vector.prototype.Magnitude;

// /  -> \
// \  F  /
Vector.prototype.F = Vector.prototype.Magnitude;


function VelocityVector(max_size) {
    if (max_size == undefined) this.max_size = SERIES_MAX_SIZE;

    this.vectors = new Dequeue();
    this.timeline = new Dequeue();
}

VelocityVector.prototype.add = function (Vector, time) {
    this.vectors.push(Vector);
    this.timeline.push(time);
    if (this.vectors.length > this.max_size) this.vectors.shift();
    if (this.timeline.length > this.max_size) this.timeline.shift();
};

/*
                                             /velocity/

 A vector quantity that denotes the rate of change of position with respect to time,
                                                                            or a speed with a directional component.

                                 /Contrast speed and velocity in physics/

 KEY POINTS
 - Average velocity can be calculated by determining the total displacement divided by the total
                                                                                                time of travel.

 - The average velocity of an object does not tell us anything about what happens to it between
                                                                                the starting point and ending point.

 - Average velocity is different from average speed in that it considers the direction of travel and
                                                                                    the overall change in position.



 scalar     - A quantity that has _magnitude_ but [not direction]; compare vector.
 magnitude  - A number assigned to a vector indicating its length.


 In everyday usage, the terms "speed" and "velocity" are used interchangeably.
 In physics, however, they are distinct quantities. Speed is a /scalar/ quantity and has only /magnitude/.

 */
VelocityVector.prototype.velocity = function (time, precision) {

    var v = this.vectors[0];
    v.distance /

//            var Avg_Velocity_X = (distance_x / (time - last_time));
//            var Avg_Velocity_Y = (distance_y / (timhttp://www.ai-class.com/e - last_time));
//
//            var Squared_Avg_Velocity_X = Math.pow(Avg_Velocity_X, 2);
//            var Squared_Avg_Velocity_Y = Math.pow(Avg_Velocity_Y, 2);

    Math.sqrt(Squared_Avg_Velocity_X + Squared_Avg_Velocity_Y);
};

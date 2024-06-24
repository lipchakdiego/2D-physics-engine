//Call requestAnimFrame with a paramater of the game loop function to call
requestAnimationFrame(loopStep);

//Physics loop steps
//1. User interaction
//2. Positional logic
//3. Collision Detection
//4. Collision Resolution

//Collison decorator Pattern Abstraction
//These methods describe the attributes necessary for resulting collision calculations

let Collision = {
    //Elastic collisions refer to two entities colliding and transfer of energy is performed to calculate resulting speed
    //Restitution represents 'bounciness'
    elastic: (restitution) => {
        this.restitution = restitution || .2
    },

    //Displacement Collisions could include friction to slow down entities as they slide across the coliding entity
    displace: () => {

    }
};

//The physics entity will take a shape, collision, and type from parameters
//Entities will be built as functional objects to be instantiated by the 'new' keyword

let PhysicsEntity = (collisionName, type) => {
    //Set defaults if no parameters given
    //Type represents collision detectors handling
    this.type = type || PhysicsEntity.DYNAMIC

    //collision represents the type of collision another entity will recieve upon colliding
    this.collision = collisionName || PhysicsEntity.ELASTIC

    //Take in a width and height
    this.width = 20;
    this.height = 20

    //Store a half size for quick calculations
    this.halfWidth = this.width * .5
    this.halfHeight = this.height * .5

    let collison = Collision[this.collision]
    collision.call(this)

    //Setting up the positional data in 2d

    //Postition
    this.x = 0;
    this.y = 0

    //Velocity
    this.vx = 0;
    this.vy = 0;

    //Acceleration
    this.ax - 0;
    this.ay - 0;

    //Update the bounds of the object to recalculate the half sizes and any other pieces
    this.updateBounds()
}

//Physics Entity Calculations
PhysicsEntity.prototype = {
    
    //updateBounds includes the rect's boundry updates
    updateBounds: () => {
        this.halfWidth = this.width * .5
        this.halfHeight = this.height * .5
    },

    //Getters for the midpoint
    getMidX: () => {
        return this.halfWidth + this.x
    },
    
    getMidY: () => {
        return this.halfHeight + this.y
    },


    //Getters for the top, left, right, and bottom of rectangle
    getTop: () => {
        return this.y;
    },

    getLeft: () => {
        return this.x
    },

    getRight: () => {
        return this.x + this.width
    },

    getBottom: () => {
        return this.y + this.height
    }

}

//Constants

//Engine Constants

//Constants represent 3 types of entities in the game

//Kinematic entities are not affected by gravity
//Will not allow solvers to solve these elements
//These will be the platforms in the stage
PhysicsEntity.KINEMATIC = 'kinematic';

//Dynamic entities will be completely changing and 
//are affected by all aspects of the physics system
PhysicsEntity.DYNAMIC = 'dynamic'

//Solver Constants

//These represent the different methods out solver will
//take to resolve collisions

//Displace will only move an entity outside of the
//space of the other and set velocity to zero in that direction
PhysicsEntity.DISPLACE = 'displace'

//Elastic resolution will displace and also bounce the colliding entity
//off by reducing the velocity by its restitution coefficient
PhysicsEntity.ELASTIC = 'elastic'


//Rect collision tests the edges of each rect to
//test whether the objects are overlapping the other
CollisionDetector.prototype.collideRect = (collider, collidee) => {

    //Store the collider and collidee edges
    let left1 = collider.getLeft()
    let top1 = collider.getTop()
    let right1 = collider.getRight()
    let bottom1 = collider.getBottom()

    let left2 = collider.getLeft()
    let top2 = collider.getTop()
    let right2 = collider.getRight()
    let bottom2 = collider.getBottom()

    //If any edges are beyond any of the others, than we know they cannot be colliding
    if(bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2){
        return false
    }else {
        return true
    }
}


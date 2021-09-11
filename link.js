class Link{
    constructor(bodyA,bodyB){

        var lastlink = bodyA.body.bodies.length-4

        var options={
            bodyA:bodyA.body.bodies[lastlink],
            bodyB:bodyB,
            length:10,
            stiffness:0.01
        }

        this.body = Constraint.create(options)
        World.add(world,this.body)

    }

    detach(){
        World.remove(world,this.body)
    }
}
addLayer("f", {
    name: "Factorize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#bbbb00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "functions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        val = new Decimal(0)
        exp = new Decimal(0)
        mul = new Decimal(0)
        ten = new Decimal(10)
        remain = player.points
        if(remain.equals(0)){return 0}
        while(remain.gt(0)){
            while((base.pow(exp)).lt(remain)){
                exp=exp.add(1)
            }
            while(((base.pow(exp)).mul(mul)).lt(remain)){
                mul=mul.add(1)
            }
            remain=remain.sub((base.pow(exp)).mul(mul))
            val=val.add((ten.pow(exp)).mul(mul))
        }
        return val
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Factorize for functions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Base Shift 10 -> 9",
            description: "Reduces your base from 10 to 9.",
            cost: new Decimal(100),
        }
    }
})

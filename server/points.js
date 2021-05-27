let pointsArr = []
let names = []
let map = new Map()
let map2 = new Map()
let total = 0

module.exports = {

    newPoints: (req, res) => {
        const {points} = req.body
        const {payer} = req.body
        const {time} = req.body


        let x = parseInt(points)
        // names.push(time)
        let newObj = {
            'payer': payer,
            'points': x,
            'timestamp': time
        }

        total += x
        console.log(total)

        if(map.has(payer)){
            let m = map.get(payer)
            map.set(payer , m + x)
        }else{
            map.set(payer, x)
        }

        // indSum.push(newObj)
        pointsArr.push(newObj)
        res.status(200).send(pointsArr)
    },
    
    getPoints: (req, res) => {
        // console.log(tStamp)
        const {pointsOff} = req.body
        let totalRemove = pointsOff

        console.log(total, pointsOff)

        if(totalRemove > total){
            console.log(['Not enough points'])
            res.status(200).send(['Not enough points'])

        }
        else{
        
        let sortedDates = pointsArr.sort(function(a,b){
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        // console.log(totalRemove)
        
        for(let i = 0; i < sortedDates.length; i++){
            
           
            totalRemove -= sortedDates[i].points
            
            
            sortedDates[i].points = sortedDates[i].points - sortedDates[i].points
            
            if(totalRemove - sortedDates[i].points < 0){
                sortedDates[i].points = sortedDates[i].points - totalRemove
                totalRemove = 0
                break
            }
            if(totalRemove === 0 || totalRemove < 0){
                break
            }
        }
        
        for(let i = 0; i < sortedDates.length; i++){
            
            if(map2.has(sortedDates[i].payer)){
                let num = map2.get(sortedDates[i].payer) 
                map2.set(sortedDates[i].payer, num + sortedDates[i].points)
            }else{
                map2.set(sortedDates[i].payer, sortedDates[i].points)
                names.push(sortedDates[i].payer)
            }
            
        }
        console.log(names)
        console.log(map)
        console.log(map2)

        let sendObj = []

        for(let i = 0; i < names.length; i++){
            let number = map.get(names[i])
            let number2 = map2.get(names[i])
            let result = number2 - number
            map.set(names[i], result)
            sendObj.push({
                'payer': names[i],
                'points': result
            })
        }

        console.log(sendObj)

        res.status(200).send(sendObj)
        }
    }

}
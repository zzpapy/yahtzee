let nbLancer = 0
let nbParties = 0
function randomDiceValue(){

    let nbAlea = Math.floor(((Math.random()*10)%6)+1)
    
    return nbAlea
}
$(".parties").html('Nombre de parties jouées : '+nbParties)
function endTurn(){
    $("#roll").hide()
    $("#stop").hide()
    $("#makeScore").show()
    console.log('toto')
}
function startTurn(){
    $("#roll").show()
    $("#stop").show()
    $("#makeScore").hide()
    nbLancer = 0
    console.log(nbLancer)
}
$(document).ready(function(){
    $("#plateau .dice").css("visibility", "hidden")
    $("#makeScore").hide()
});

$("#roll").click(function(){
    console.log(nbLancer)
    nbLancer++
    $(this).data("nbrLancer",nbLancer)
    console.log($(this).data("nbrLancer"))
    $("#plateau .dice").css("visibility", "visible")
    
    $(".dice:not(.blocked) img").each(function(){
    
        let nbAlea = randomDiceValue()
        
        let pathImg = "./img/inverted-dice-"+nbAlea+".png";
        
        $(this).attr("src", pathImg)
        $(this).data("nb", nbAlea)
        
    })
    
    if(nbLancer == 3){
        nbParties++
        $(".parties").html('Nombre de parties jouées : '+nbParties)
        endTurn()
    }
})

$(".dice").click(function(){
    $(this).toggleClass("blocked")
    
    let somme = 0

    $(".dice.blocked img").each(function(){
        somme+= $(this).data("nb")
    })
    
    $("#plateau").data("score", somme)
})

$("#stop").click(function(){
    nbParties++
    $(".parties").html('Nombre de parties jouées : '+nbParties)
    endTurn()
})

$("#makeScore").click(function(){
    $("#score").html($("#plateau").data("score"))
   
})
$(".choix_score").click(function(){
    tab=[]
    let somme = 0
    $(".dice.blocked img").each(function(){
        tab.push($(this).data("nb"))
        somme+= $(this).data("nb")

    })
    const allEqual = arr => arr.every( v => v === arr[0] )
    if(allEqual(tab )){
        if(tab[0]==$(this).data("value")){
            if($(this).html() == ""){
                $(this).append(somme)
                startTurn()
                nbParties++
                console.log(nbParties)
                $(".parties").html('Nombre de parties jouées : '+nbParties)
                $(".dice.block").removeClass('block')
            }
            else{
                // uniqueCount = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"];
                var count = {};
                tab.forEach(function(i) { count[i] = (count[i]||0) + 1;});
                console.log(typeof(count));
            }
        }
    }
})
// tab = [1,1,2,2?1?4,4,5,5]

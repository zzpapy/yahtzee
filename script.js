let nbLancer = 0
let nbParties = 0
let finJeu = 0
let grandTotal = 0
function randomDiceValue(){

    let nbAlea = Math.floor(((Math.random()*10)%6)+1)
    
    return nbAlea
}

$(".parties").html('Nombre de parties jouées : '+nbParties)
function endTurn(){
    $("#roll").hide()
    $("#stop").hide()
    $("#makeScore").show()
}
function startTurn(){
    $("#roll").show()
    $("#stop").show()
    $("#makeScore").hide()
    nbLancer = 0
}
$(document).ready(function(){
    $("#plateau .dice").css("visibility", "hidden")
    $("#makeScore").hide()
});
$("#roll").click(function(){
    $(this).data("nbrLancer",nbLancer)
    nbLancer++
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
        $(".raye").each(function(){
            $(this).toggleClass("choix")
            $(this).children(".choix_score + td").show()
            $(this).children(".choix_score + td").html("<img style ='width:3em;height:3em' src = 'img/cross.png'>")
            if(finJeu == 2){
                $("#plateau").remove()
                $("#score").remove()
                $(".fini").html("<div>C'EST FINI</div>")
                $(".fini").append(grandTotal)
                console.log(grandTotal)
                // $(".fin").html(grandTotal)
            }
        })
        finJeu++
        endTurn()
    }
})
$(".choix2").click(function(){
    $(this).closest("tr").remove()
        $(".choix").each(function(){
            $(".raye.choix").each(function(){
                $(this).toggleClass("choix")
                $(this).children(".choix_score + td").html("")
                $(this).children(".choix_score + td").hide()
            })
        })
        
        $(".dice.blocked").toggleClass("blocked")
        nbLancer++
    $(".dice:not(.blocked) img").each(function(){
    
        let nbAlea = randomDiceValue()
        
        let pathImg = "./img/inverted-dice-"+nbAlea+".png";
        
        $(this).attr("src", pathImg)
        $(this).data("nb", nbAlea)
        
    })
    startTurn();
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
   $(".makeScore").html("Rayez une proposition dans la grille")
})
// $(".passer").click(function(){
//     console.log('toto')
//     startTurn();
//     nbParties++
   
// })
// function myFunc(arr){
//     var x= arr[0];
//     return arr.every(function(item){
//         return item=== x;
//     });
// }
$(".choix_score").click(function(){
    tab=[]
    
    let somme = 0
    $(".dice.blocked img").each(function(){
        tab.push($(this).data("nb"))
        somme+= $(this).data("nb")
        
    })
    const allEqual = arr => arr.every( v => v === arr[0] )
    
    console.log(tab);
    if(allEqual(tab )){
        if(tab[0]==$(this).data("value") && $.isNumeric($(this).data("value"))){
            if($(this).html() == "0"){
                $(this).empty()
            $(this).append(somme)
            startTurn()
            nbParties++
            $(".parties").html('Nombre de parties jouées : '+nbParties)

            $(".dice.blocked").toggleClass("blocked")
            }
        }
        else if(allEqual(tab ) && !($.isNumeric($(this).data("value")))){
            switch(true) {
                case tab.length ==3 && $(this).data("value") == "brelan":
                    $(this).empty()
                    $(this).append(somme)
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)

                    $(".dice.blocked").toggleClass("blocked")
                    break;
                case tab.length == 4 && $(this).data("value") == "carre":
                    $(this).empty()
                    $(this).append(somme)
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)

                    $(".dice.blocked").toggleClass("blocked")
                    break;
                case tab.length == 5 && $(this).data("value") == "YAHTZ":
                    if($(this).html() !="0"){
                        console.log($(this).html())
                        $(".bonus").html(parseInt($(".bonus").html()) + 100)
                         
                    }
                    console.log('toto')
                    $(this).empty()
                    $(this).append("50")
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)

                    $(".dice.blocked").toggleClass("blocked")
                    break;
            }
        }
        }
        else if(tab.length == 5 && $(this).data("value") == "full"){
            function count(tab) {
                tab.sort();
                tab_full = []
                var current = null;
                var cnt = 0;
                for (var i = 0; i < tab.length; i++) {
                    if (tab[i] != current) {
                        if (cnt > 0) {
                        tab_full.push([current,cnt])
                }
                    current = tab[i];
                    cnt = 1;
                } 
                else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                tab_full.push([current,cnt])
            }
            return tab_full
        }
        if(count(tab).length == 2){
            if($(this).html() == "0"){
                $(this).empty()
                $(this).append("25")
                startTurn()
                nbParties++
                $(".parties").html('Nombre de parties jouées : '+nbParties)
        
                $(".dice.blocked").toggleClass("blocked")
            }
        }
        
    }
    else if($(this).data("value") == "psuite"){
        var psuite = [1, 2, 4, 3, 5];
        var gsuite = [2, 4, 3, 5, 6];
        var points = 0;
        tab = tab.sort()
        console.log(tab)
        for (var i = 0; i <= 4; i++) {
            if (tab[i] == psuite[i]){
                if($(this).html() == "0"){
                    $(this).empty()
                    $(this).append("30")
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)
            
                    $(".dice.blocked").toggleClass("blocked")
                }
                console.log(tab[i] , psuite[i]);
            }         
            else{
                console.log(tab[i] , psuite[i]);
            }
            
        }
    }
    else if($(this).data("value") == "psuite"){
        var psuite = [1, 2, 4, 3, 5];
        var points = 0;
        tab = tab.sort()
        console.log(tab)
        for (var i = 0; i <= 4; i++) {
            if (tab[i] == psuite[i]){
                if($(this).html() == "0"){
                    $(this).empty()
                    $(this).append("30")
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)
            
                    $(".dice.blocked").toggleClass("blocked")
                }
                console.log(tab[i] , psuite[i]);
            }         
        
        }
    }
    else if($(this).data("value") == "gsuite"){
        var gsuite = [2, 4, 3, 5, 6];
        var points = 0;
        tab = tab.sort()
        console.log(tab)
        for (var i = 0; i <= 4; i++) {
            if (tab[i] == gsuite[i]){
                if($(this).html() == "0"){
                    $(this).empty()
                    $(this).append("40")
                    startTurn()
                    nbParties++
                    $(".parties").html('Nombre de parties jouées : '+nbParties)
            
                    $(".dice.blocked").toggleClass("blocked")
                }
            }         
            
        }
    }
    console.log(grandTotal)
    let total = 0
    let total1 = 0
    $(".upper").each(function(){
        total+= parseInt($(this).html())
        
    })
    $(".total_upper").html(total)
    $(".lower").each(function(){
        total1+= parseInt($(this).html())
    })
    $(".total_lower").html(total1)
    grandTotal = total + total1
    $(".grand_total").html(grandTotal)
    console.log(grandTotal,total,total1,nbParties)
    
    $(".choix").each(function(){
        $(".raye.choix").each(function(){
            $(this).toggleClass("choix")
            $(this).children(".choix_score + td").html("")
        })
    })
    nbLancer++
    $(".dice:not(.blocked) img").each(function(){
    
        let nbAlea = randomDiceValue()
        
        let pathImg = "./img/inverted-dice-"+nbAlea+".png";
        
        $(this).attr("src", pathImg)
        $(this).data("nb", nbAlea)
        
    })
    if(finJeu == 2){
        $("#plateau").remove()
        $(".flex").remove()
        $(".fini").html("<div>C'EST FINI</div>")
        $(".fini").append(grandTotal)
        console.log(grandTotal)
    }
    
   
})
var face=1;
var show = function() {
    $('.cube1').attr('class', 'cube cube1 show'+face);
        
    let nbAlea = randomDiceValue()

    face=nbAlea
};

var show2 = function() {
  $('.cube2').attr('class', 'cube cube2 show'+face);
  if(face==6) {
    face=1;
  } else {
    face++; 
  }
};

$('.cube1').on('click', show);
$('.cube2').on('click', show2);
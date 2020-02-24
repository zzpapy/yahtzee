console.log('test');
class Joueur { 
    constructor(nom,nbLancer,nbParties,finJeu,total,total1,grandTotal,score) 
    { 
        this.nom = nom,
        this.nbLancer = nbLancer,
        this.nbParties = nbParties,
        this.finJeu = finJeu,
        this.total = total,
        this.total1 = total1,
        this.grandTotal = grandTotal,
        this.score = []
    }     
} 

$('#joueurs').change(function test(){
    nbrJoueurs = $(this).val()
    $('.nbr').html(nbrJoueurs)
    
})

let player = new Joueur("tata",0,0,0,0,0,0);
let player2 = new Joueur("toto",0,0,0,0,0,0);
// let nbrJoueurs = 0;
// console.log(player.nbLancer)
Jeu()
function Jeu (jouer){
    $(".next").hide()
    $(".objet").data("objet",player)
    joueur1 = $(".objet").data("objet")
    $(".objet1").data("objet",player2)
    joueur2 = $(".objet1").data("objet")
    jouer = joueur1
    console.log($(".objet").data("objet"))
    $(".objet1").data("objet",player2)
    console.log($(".objet").data("objet"))
    $(".nom").html(jouer.nom)
    function randomDiceValue(){
    
        let nbAlea = Math.floor(((Math.random()*10)%6)+1)
        
        return nbAlea
    }
    
    $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
    function endTurn(){
        $("#roll").hide()
        $("#stop").hide()
        $("#makeScore").show()
    }
    function startTurn(){
        $("#roll").show()
        $("#stop").show()
        $("#makeScore").hide()
        jouer.nbLancer = 0
    }
    $(document).ready(function(){
        $("#plateau .dice").css("visibility", "hidden")
        $("#makeScore").hide()
    });
    $("#roll").click(function(){
        $(this).data("nbrLancer",jouer.nbLancer)
        jouer.nbLancer++
        $("#plateau .dice").css("visibility", "visible")
        
        $(".dice:not(.blocked) img").each(function(){
        
            let nbAlea = randomDiceValue()
            
            let pathImg = "./img/inverted-dice-"+nbAlea+".png";
            
            $(this).attr("src", pathImg)
            $(this).data("nb", nbAlea)
            
        })
        
        if(jouer.nbLancer == 3){
            jouer.nbParties++
            
            $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
            $(".raye").each(function(){
                $(this).toggleClass("choix")
                $(this).children(".choix_score + td").show()
                $(this).children(".choix_score + td").html("<img style ='width:3em;height:3em' src = 'img/cross.png'>")
                // player = $(".objet").data("objet")
                if(player.finJeu == 2){
                    $("#plateau").remove()
                    $("#score").remove()
                    $(".fini").html("<div>C'EST FINI</div>")
                    $(".fini").append(grandTotal)
                    console.log(grandTotal)
                    // $(".fin").html(grandTotal)
                }
            })
           
            jouer.finJeu++
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
            jouer.nbLancer++
        $(".dice:not(.blocked) img").each(function(){
        
            let nbAlea = randomDiceValue()
            
            let pathImg = "./img/inverted-dice-"+nbAlea+".png";
            
            $(this).attr("src", pathImg)
            $(this).data("nb", nbAlea)
            
        })
        if(jouer == $(".objet").data("objet")){
            jouer = $(".objet1").data("objet")
            console.log(jouer)
        }
        else{
            jouer = $(".objet").data("objet")
        }
        // $(".nom").html("")
        // $(".nom").html(jouer.nom)
        // $(".choix_score").each(function(){
        //     jouer.score.push($(this).html())            
        // })
        // console.log(jouer.score)
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
        jouer.nbParties++
        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
        endTurn()
    })
    
    $("#makeScore").click(function(){
       $(".makeScore").html("Rayez une proposition dans la grille")
    })
    $(".choix_score").click(function(){
        tab=[]
        
        let somme = 0
        $(".dice.blocked img").each(function(){
            tab.push($(this).data("nb"))
            somme+= $(this).data("nb")
            
        })
        const allEqual = arr => arr.every( v => v === arr[0] )
        
        // console.log(tab);
        if(allEqual(tab )){
            if(tab[0]==$(this).data("value") && $.isNumeric($(this).data("value"))){
                if($(this).html() == "0"){
                    $(this).empty()
                $(this).append(somme)
                startTurn()
                jouer.nbParties++
                $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
    
                $(".dice.blocked").toggleClass("blocked")
                }
            }
            else if(allEqual(tab ) && !($.isNumeric($(this).data("value")))){
                switch(true) {
                    case tab.length ==3 && $(this).data("value") == "brelan":
                        $(this).empty()
                        $(this).append(somme)
                        startTurn()
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
    
                        $(".dice.blocked").toggleClass("blocked")
                        break;
                    case tab.length == 4 && $(this).data("value") == "carre":
                        $(this).empty()
                        $(this).append(somme)
                        startTurn()
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
    
                        $(".dice.blocked").toggleClass("blocked")
                        break;
                    case tab.length == 5 && $(this).data("value") == "YAHTZ":
                        if($(this).html() !="0"){
                            console.log($(this).html())
                            $(".bonus").html(parseInt($(".bonus").html()) + 100)
                             
                        }
                        $(this).empty()
                        $(this).append("50")
                        startTurn()
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
    
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
                    jouer.nbParties++
                    $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
            
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
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
                
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
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
                
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
                        jouer.nbParties++
                        $(".parties").html('Nombre de parties jouées : '+jouer.nbParties)
                
                        $(".dice.blocked").toggleClass("blocked")
                    }
                }         
                
            }
        }
        // console.log(grandTotal)
        jouer.total = 0
        $(".upper").each(function(){
            jouer.total += parseInt($(this).html())
        })
        $(".total_upper").html(jouer.total)
        jouer.total1 = 0
        $(".lower").each(function(){
            // total1+= parseInt($(this).html())
            jouer.total1 += parseInt($(this).html())
        })
        $(".total_lower").html(jouer.total1)
        jouer.grandTotal = jouer.total + jouer.total1
        $(".grand_total").html(jouer.grandTotal)
        // console.log(grandTotal,total,total1,nbParties)
        
        $(".choix").each(function(){
            $(".raye.choix").each(function(){
                $(this).toggleClass("choix")
                $(this).children(".choix_score + td").html("")
            })
        })
        jouer.nbLancer++
        $(".dice:not(.blocked) img").each(function(){
        
            let nbAlea = randomDiceValue()
            
            let pathImg = "./img/inverted-dice-"+nbAlea+".png";
            
            $(this).attr("src", pathImg)
            $(this).data("nb", nbAlea)
            
        })
        $(".choix_score").each(function(){
            jouer.score.push($(this).html())
        })
        i=0
        $(".next").show()
        setTimeout(function (){
            i++
            setInterval(function(){
                $(".next").append("<span>"+i+"</span>")
                $(".next span").remove()
            })
            $(".choix_score").each(function(){
                $(this).html("0")           
            })
            console.log(jouer.score)
            if(jouer == $(".objet").data("objet")){
                jouer = $(".objet1").data("objet")
                console.log(jouer)
            }
            else{
                jouer = $(".objet").data("objet")
            }
            $(".nom").html("")
            $(".nom").html(jouer.nom)
            $(".next").append("<span>"+i+"</span>")
            $(".next span").remove()

        },5000)
        $(".next").hide()
        if(jouer.finJeu == 2){
            $("#plateau").remove()
            $(".flex").remove()
            $(".fini").html("<div>C'EST FINI</div>")
            $(".fini").append(grandTotal)
            console.log(grandTotal)
        }
        
       
    })
}







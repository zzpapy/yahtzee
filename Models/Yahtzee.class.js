class Yahtzee { 
    constructor() 
    { 
        this.player = new Joueur("tata");
        this.player2 = new Joueur("toto");
    }
    renderTable(){
        let tabCombi = ["Brelan","Carré","Full","psuite","gsuite", "YAHTZ", "YAHTZ", "bonus"]
        let tabData = ["brelan","carre","full","Petite suite","Grande Suite", "Yahtzee", "chance", "yahtzee bonus"]
       
        let html =  "<div id='score'><table><thead><th>"+
                    "Combinaisons</th><th>Calcul du score</th><th>Score</th></thead>"+
                    "<tr><th colspan='4'>Combinaisons simples</th></tr>"                    
        for(let x = 1; x <= 14; x++){
            html+= "<tr>"
            for(let y = 1; y <= 1; y++){
                if(x<=6){
                    html+=  "<td class='raye' id='"+x+"-"+y+"'>"+
                    "<img class='face'src='img/inverted-dice-"+x+".png' alt='face un'></td>"+
                    "<td>toto</td>"+
                    "<td data-value ='"+x+"' class='choix_score upper'>0</td>"+
                    "<td class='choix2'><i class='cross'></i></td></tr>"
                }
                else{
                    if(x == 7){
                        html+= "<tr><td>TOTAL</td>"+
                        "<td></td>"+
                        "<td class='total_upper'></td></tr>"+
                        "<tr><th colspan='4'>Combinaisons complexes</th></tr><td></td>"
                    }

                    html+=  "<tr><td>"+tabCombi[x-7]+"</td>"+
                    "<td>toto</td>"+
                    "<td data-value ='"+tabData[x-7]+"' class='choix_score lower'>0</td>"+
                    "<td class='choix2'><i class='cross'></i></td>"
                }
            }
            
            
        }
        html+= "</tr>"+
            "<tr class='raye'>"+
            "<td>TOTAL</td><td></td><td class = 'total_lower'></td></tr>"+
            "<tr><td>GRAND TOTAL</td><td></td><td class = 'grand_total'></td></tr></tbody></table>"
        return html
    }

} 
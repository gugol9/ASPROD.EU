var numer = Math.floor(Math.random()*5)+1;
var timer1 = 0;
var timer2 = 0;


function ustawslajd(nrslajdu)
{
    clearTimeout(timer1);
    clearTimeout(timer2);
    numer = nrslajdu - 1;

    schowaj();
    setTimeout("zmienslajd()",500)
}

function schowaj()
{
    $("#slider").fadeOut(500);
}

function zmienslajd()
{
    numer++; if (numer > 5) numer = 1;

    var plik = "<img src = \"slajdy/slajd" + numer + ".png\"/>";

    document.getElementById("slider").innerHTML = plik;
    $("#slider").fadeIn(500);  //jquery zanikanie obrazu

    timer1 = setTimeout("zmienslajd()", 5000);

    timer2 = setTimeout("schowaj()", 4500);

}
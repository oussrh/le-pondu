        let guesword = [];
        let leStatut = 0;
        let erreurCpt = 0;
        let faut = "";

        function motdevine() {

            let leMot = document.querySelector('#leMotInput').value.toUpperCase();
            let indice = document.querySelector('#indiceInput').value;
            theWord = leMot.split('');

            for (i = 0; i < theWord.length; i++) {
                guesword[i] = '_';
            }

            document.querySelector('#popupStart').style.visibility = 'hidden';
            document.getElementById('lettre').focus();

            let vide = "";
            for (x = 0; x < guesword.length; x++) {
                vide += guesword[x] + ' ';
            }
            document.querySelector('#dejaDevine').innerHTML = vide;
            if (indice == '') {
                document.querySelector('#indiceArea').innerHTML = 'Aucun indice :-(';
            } else {
                document.querySelector('#indiceArea').innerHTML = indice;
            }

        }

        function replayGame() {
            window.location.reload();
        }

        function testTabeles() {
            if (theWord.join() === guesword.join()) {
                document.getElementById('lettre').value = "";
                document.getElementById('lettre').style.visibility = "hidden";
                if (erreurCpt == 0) {
                    document.querySelector('#msgEnd').innerHTML = "Parfait c'\est un sans faute";
                    
                } else if (erreurCpt == 1) {
                    document.querySelector('#msgEnd').innerHTML = "Bravo, vous avez gagné avec <strong>une</strong> seule erreur";
                } else {
                    document.querySelector('#msgEnd').innerHTML = "Bravo, vous avez gagné avec <strong>" + erreurCpt + "</strong> erreurs";
                }

                document.querySelector('#popupEnd').style.visibility = 'visible';
            } else {
                let lettre = document.querySelector('#lettre').value.toUpperCase();

                for (i = 0; i < theWord.length; i++) {

                    if (theWord[i] == lettre && guesword[i] == lettre) {
                        leStatut = 2;
                    } else if (theWord[i] == lettre) {
                        guesword[i] = lettre;
                        leStatut = 1;
                    }
                }
            }
        }

        function guessLetter() {

            testTabeles();

            if (leStatut == 1) {
                let mot = "";
                for (x = 0; x < guesword.length; x++) {
                    mot += guesword[x] + ' ';
                }
                document.querySelector('#dejaDevine').innerHTML = mot;
                leStatut = 0;
                document.getElementById('lettre').value = "";
            } else if (leStatut == 2) {
                console.log('vous avez déjà deviné cette lettre');
                leStatut = 0;
                document.getElementById('lettre').value = "";
            } else {
                erreurCpt++
               let img = "img/frame"+erreurCpt+".gif";
                document.querySelector('#leCon').style.backgroundImage ='url("'+img+'")';
                
                if (erreurCpt == 5) {
                    document.querySelector('#nbrErreurs').innerHTML = erreurCpt + ' erreurs';
                    document.querySelector('#popupEnd').style.visibility = 'visible';
                    document.getElementById('lettre').style.visibility = "hidden";
                    document.querySelector('#msgEnd').innerHTML = "Vous avez perdu, le mot à deviner était : <strong>"+theWord.join("")+"</strong>"; 
                } else {
                    if (erreurCpt == 1) {
                        document.querySelector('#nbrErreurs').innerHTML = erreurCpt + 'erreur';
                    } else {
                        document.querySelector('#nbrErreurs').innerHTML = erreurCpt + 'erreurs';
                    }

                    console.log('pas bien ' + erreurCpt + " erreur");
                    faut += document.querySelector('#lettre').value.toUpperCase() + ', ';
                    document.querySelector('#Faute').innerHTML = faut;
                    document.getElementById('lettre').value = "";
                }

            }

            testTabeles();
        }


        letPlay.addEventListener('click', motdevine);
        replay.addEventListener('click', replayGame);
        document.querySelector('#lettre').addEventListener('keyup', guessLetter);

        //document.querySelector('#lettre').addEventListener('keyup',test);
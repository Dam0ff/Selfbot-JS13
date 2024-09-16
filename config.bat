@echo off
setlocal

:: Demande de token et de préfixe
set /p TOKEN="Veuillez entrer votre token Discord : "
if "%TOKEN%"=="" (
    echo Vous n'avez pas entré de token. Le processus est annulé.
    goto End
)

set /p PREFIX="Veuillez entrer le préfixe que vous souhaitez utiliser : "
if "%PREFIX%"=="" (
    echo Vous n'avez pas entré de préfixe. Le processus est annulé.
    goto End
)

:: Mise à jour du fichier config.json
echo { > config.json
echo "token": "%TOKEN%", >> config.json
echo "prefix": "%PREFIX%" >> config.json
echo } >> config.json

:End
echo Configuration terminée. Appuyez sur une touche pour fermer...
pause

endlocal

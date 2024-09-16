@echo off
setlocal

:: Vérification si Node.js est installé
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js n'est pas installé. Téléchargement de la dernière version...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/latest-v18.x/node-v18.18.1-x64.msi' -OutFile 'node-latest.msi'}"
    if %ERRORLEVEL% NEQ 0 (
        echo Erreur lors du téléchargement de Node.js.
        goto End
    )
    echo Installation de Node.js...
    msiexec /i node-latest.msi /quiet
    if %ERRORLEVEL% NEQ 0 (
        echo Erreur lors de l'installation de Node.js.
        goto End
    )
    echo Node.js installé avec succès.
    del node-latest.msi
) else (
    echo Node.js est déjà installé.
)

:: Installation des dépendances du projet
echo Installation de discord.js-selfbot-v13...
npm install discord.js-selfbot-v13
if %ERRORLEVEL% NEQ 0 (
    echo Erreur lors de l'installation de discord.js-selfbot-v13.
    goto End
)

:: Création du fichier config.json avec des valeurs par défaut
echo { > config.json
echo "token": "VOTRE_TOKEN_ICI", >> config.json
echo "prefix": "VOTRE_PREFIX_ICI" >> config.json
echo } >> config.json

:: Lancement du script de configuration pour le token et le préfixe
echo Lancement du script de configuration...
start /wait config.bat

:: Vérification de la présence du fichier bot.js
if not exist index.js (
    echo Le fichier bot.js est manquant. Assurez-vous qu'il est présent dans le répertoire du projet.
    goto End
)

:End
echo Le script est terminé. Appuyez sur une touche pour fermer...
pause

endlocal
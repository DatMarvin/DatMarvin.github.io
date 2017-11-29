cd C:\WebShare\git\DatMarvin.github.io
set /p var= <commmsg.txt
git add .
git commit -m '%var%'
git push -u origin master
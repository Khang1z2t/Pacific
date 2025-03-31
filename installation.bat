@echo off
echo DANG KIEM TRA THU VIEN...
 if not exist node_modules (
    echo DANG TAI THU VIEN...
    npm install
    echo DA TAI XONG.
    pause
    echo DANG KHOI DONG WEBSITE...
    npm start
    echo DA KHOI DONG XONG.
    exit
) else (
    echo THU VIEN DA TON TAI.
)
    echo DANG KHOI DONG WEBSITE
    npm start
    exit
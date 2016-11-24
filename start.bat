MKDIR scss

MKDIR css
echo.> "css\style.css"
echo @import "compass/reset"; @import "compass/utilities"; > "scss\style.scss"

START compass watch -c config.rb -e development
START compass watch -c config.rb -e production
EXIT
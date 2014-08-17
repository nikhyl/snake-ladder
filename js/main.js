 //Prefix free support code for jquery
      (function($, self){
      if(!$ || !self) {
      return;
      }
      for(var i=0; i<self.properties.length; i++) {
      var property = self.properties[i],
      camelCased = StyleFix.camelCase(property),
      PrefixCamelCased = self.prefixProperty(property, true);
      $.cssProps[camelCased] = PrefixCamelCased;
      }
      })(window.jQuery, window.PrefixFree);

    //Actual code for Play Action   
    $(function(){
    var x=[0,90,180,270];
    $("#nextMove").click(function(e){
      e.preventDefault();
      var rand1=Math.floor(Math.random()*4);
      var rand2=Math.floor(Math.random()*4);
      $("#dice").css("transform","rotateX("+x[rand1]+"deg) rotateY("+x[rand2]+"deg)");
      nextMove();
    });
    });


//store the co-ordinates of all the squares.
        var squares = new Array();

        var canvas = document.getElementById("board");
        var context = canvas.getContext("2d");
        var contextText = canvas.getContext("2d");
        var squareSize = canvas.height / 10;
           
        var _currentPos = 0;
        
        RenderSquareBoard();
        RenderSnakeAndLadders();      

        function RenderSquareBoard() 
        {        
            var colorA = "#669900";
            var colorB = "#ffcc00";

            var initRow = 1; var totalRows = 10; var initcolumn = 1; var totalColumns = 10;

            var x = 0; var y = canvas.height - squareSize;

            var columnNr = 1; var leftToRight = true;
            for (var row = initRow; row <= totalRows; row++) 
            {
                if (leftToRight) 
                {
                    x = 0;
                }
                else 
                {
                    x = canvas.width - squareSize;
                }

                for (var column = initcolumn; column <= totalColumns; column++) 
                {
                    if (columnNr % 2 == 0) 
                    {
                        context.fillStyle = colorA;
                    }
                    else 
                    {
                        context.fillStyle = colorB;
                    }

                    context.fillRect(x, y, squareSize, squareSize);

                    squares[columnNr] = x.toString() + ',' + y.toString();

                    contextText.font = "15px tahoma";
                    contextText.fillStyle = "black";
                    contextText.fillText(columnNr, x, y + squareSize);

                    var x1, y1
                    if (leftToRight) 
                    {
                        x += squareSize;

                        x1 = x + (squareSize / 2);
                    }
                    else 
                    {
                        x -= squareSize;
                        x1 = x - (squareSize / 2);
                    }

                    y1 = y - (squareSize / 2);

                    columnNr++;
                }

                y -= squareSize;
                leftToRight = !leftToRight;
            }
        }

        function RenderSnakeAndLadders()
        {
            var img = new Image();
            img.onload = function () 
            {
            context.drawImage(img, 66, 23);
            };
            img.src = "Images/SnakeA.gif";

            var img1 = new Image();
            img1.onload = function () 
            {
            context.drawImage(img1, 66, 166);
            };
            img1.src = "Images/SnakeB.gif";
            //context.drawImage(img, 66, 166);
            
            context.drawImage(img, 66, 23);

            var img2 = new Image();
            img2.onload = function () {
                context.drawImage(img2, 57, 166);
            };
            img2.src = "Images/LadderA.gif";

            var img3 = new Image();
            img3.onload = function () 
            {
                context.drawImage(img3, 322, 366);
            };
            img3.src = "Images/LadderA.gif";            
        }

        function initGame() 
        {
            window.location.reload();           
        }

        function GenerateRandomNumber(max) 
        {
            // max dictates that the random number will fall between 0-max
            var rnd = Math.floor(Math.random() * (max + 1))

            if (rnd == 0)
            {
                rnd = 1;
            }
        return rnd;
        }

        function nextMove() 
        {
            var newMove = GenerateRandomNumber(6);

            //alert("You got : " + newMove);
            document.getElementById("dice_img").src='Images/d_'+newMove+'.gif';
            _currentPos = _currentPos + newMove;

            switch (_currentPos) 
            {
            //ladder
            case 6:
            _currentPos = 46;
            break;
            //ladder
            case 39:
            _currentPos = 79;
            break;
            //snake
            case 99:
            _currentPos = 29;
            break;
            //snake
            case 72:
            _currentPos = 2;
            break;             
            }

            var coorintaes = squares[_currentPos];
            coorintaes = coorintaes.split(',');

            context.fillRect(coorintaes[0], coorintaes[1], squareSize, squareSize);

            if (_currentPos == 100)
            {
                alert("Congratulations, you have won the game :)");
                initGame();
            }
        }

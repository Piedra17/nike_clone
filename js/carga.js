function progress(){
    var percent = document.querySelector('.percent');
    var progress = document.querySelector('.progress');
    var text = document.querySelector('.text');
    var count = 4;
    var per = 16;
    var loading = setInterval(animate, 50);
    function animate(){
      if(count == 100 && per == 400){
        percent.classList.add("text-blink");
        text.style.display = "block";
        clearInterval(loading);
      }else{
        per = per + 4;
        count = count + 1;
        progress.style.width = per + 'px';
        percent.textContent = count + '%';
      }
    }
  }
  progress();

// /*Redirige después de 5 segundos*/
        setTimeout(function() {
            window.location.href = 'Home.html';
        }, 5000); // 5000 milisegundos = 5 segundos
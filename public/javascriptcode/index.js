$(document).ready(function () {
  

  $("#container1").on("click", "#btnEliminarBook", function () {
    alerta();

   
  });

  $("#container2").on("click", "#btnEliminaredito", function () {
    alerta2() 

   
  });

  $("#container3").on("click", "#btnEliminarcat", function () {
    alerta3()
   
  });

  $("#container4").on("click", "#btnEliminarauto", function () {
    alerta4()
   
  });

  function alerta() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }
    
  function alerta2() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }

  function alerta3() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }

  function alerta4() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }

});


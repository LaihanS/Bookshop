exports.compare3 = (dato, lib)=> {
  

    const datos = lib;
    var dat = 0;
    
    datos.forEach(element => {
    console.log(element)
    if (dato == element.dataValues.autorId) {
        dat++
    }
    });
    
    return dat;
    
    }
    
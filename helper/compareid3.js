exports.compare4 = (dato, lib)=> {
  

    const datos = lib;
    var dat = 0;
    
    datos.forEach(element => {
    console.log(element)
    if (dato == element.dataValues.categoriumId) {
        dat++
    }
    });
    
    return dat;
    
    }
    
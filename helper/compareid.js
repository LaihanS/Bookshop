exports.compare2 = (dato, lib)=> {
  

const datos = lib;
var dat = 0;

datos.forEach(element => {
console.log(element)
if (dato == element.dataValues.editorialId) {
    dat++
}
});

return dat;

}

function formatar(data, datames){
    formatada = data.toLocaleDateString();
    formatadaMes = datames.toLocaleDateString();
    formatada = formatada.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')
    formatadaMes = formatadaMes.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')

    return formatadaMes, formatada;
}

module.exports = formatar;
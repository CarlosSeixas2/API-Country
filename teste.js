async function pesquisaAPI(country){
    const url = `https://restcountries.com/v3.1/translation/${country}`;
    const response = await fetch(url);
    const countries = await response.json()
    let ar_c = countries[0]

    return insertInfos(ar_c.flags.svg, ar_c.name.common, ar_c.capital[0], ar_c.borders, ar_c.population)
}

function insertInfos(flag, name, capital, fronteira, population){
    let div_img = document.querySelector(".img");
    let img = document.createElement('img');
    let name_pais = document.querySelector('.name-pais');

    let imgselect = document.querySelectorAll('img');
    let pselect = document.querySelectorAll('p');

    // Remover as antigas bandeiras
    imgselect.forEach((element) => {
        element.remove()
    })

    // Remover as antigas infos
    pselect.forEach(element => {
        element.innerHTML = '';
    })

    //Tratando o número da população
    let numpopulation = population.toLocaleString('pt-BR', { maximumFractionDigits: 0 });


    let objs = {
        Capital: capital,
        Fronteira: fronteira,
        População: numpopulation 
    }

    for(let i in objs){
        let paragrafo = document.getElementById(i);
        paragrafo.innerHTML =  i + ": " + objs[i];
    }

    img.setAttribute('src', flag);
    img.style.width = '86px';
    img.style.height = '86px';
    img.style.borderRadius = '10px';
    img.style.marginTop = '27px';
    name_pais.innerHTML = name;

    div_img.appendChild(img);
}


let pesquisar = document.querySelector('button').addEventListener('click', () => {
    let input = document.querySelector('input').value;
    
    pesquisaAPI(input)
})
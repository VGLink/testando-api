// Função que será chamada quando o primeiro link for clicado
function ligaClicada(nomeLiga, searchTeamsUrl) {
  // Variável para armazenar o conteúdo do modal
  const modalContent = document.getElementById('modalContent');

  // Faça uma nova solicitação para obter informações dos times
    fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League')
        .then(response => response.json())
        .then(teamsData => {
            // Exibe as informações dos times no modal
            modalContent.innerHTML = '';

            teamsData.teams.forEach(team => {
                const teamInfo = document.createElement('div');
                teamInfo.innerHTML = `<h2>${team.strTeam}</h2>
                                      <i>${team.strStadium}</i>
                                      <p>${team.strDescriptionPT || 'Sem descrição'}</p>`;

                modalContent.appendChild(teamInfo);
            });

            // Exibe o modal
            const modal = document.getElementById('myModal');
            modal.style.display = 'block';
        })
        .catch(error => console.error('Erro na requisição dos times:', error));
}

function close() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

(function () {
  function leagueSearch() {
    const url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
    const searchTeamsUrl = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=';

    // Faça uma solicitação para a API
    fetch(url)
      .then(response => response.json())
      .then(data => {
          const ligas = data.leagues.filter(liga => liga.strSport === 'Soccer' && liga.strLeague !== '_No League');

          const htmlArray = ligas.map((liga, index) => {
              console.log(`Nome da Liga: ${liga.strLeagueAlternate} \n Liga: ${liga.strLeague}`);
              if (index === 0) {
                  return `<div class="leagues">
                              <a href="#" onclick="ligaClicada('${liga.strLeague}', '${searchTeamsUrl}')">
                                  <h2>${liga.strLeague}</h2>
                              </a>
                              <p>${liga.strLeagueAlternate}</p>
                          </div>`;
              }

              return `<div class="leagues">
                          <h2>${liga.strLeague}</h2>
                          <p>${liga.strLeagueAlternate}</p>
                      </div>`;
          });

          const htmlString = htmlArray.join('');
          document.getElementById('divExibicao').innerHTML = htmlString;
      })
      .catch(error => console.error('Erro na requisição:', error));
  }

  // execução
  leagueSearch()
  document.getElementById('closeModal').addEventListener('click', close);
}) ();


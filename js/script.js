const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');

function apiSearch(event) {

   event.preventDefault();          // Отмена перезагрузки страницы
   
   const searchText = document.querySelector('#searchText').value;
   const server = `https://api.themoviedb.org/3/search/multi?api_key=f0e69e9835744a61a209bae6c3f7caf6&language=ru&query=${searchText}`;

   requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

   const request = new XMLHttpRequest();

   request.open(method, url);

   request.send();

   request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {

         movies.innerHTML = 'Загрузка';
         return;

      }

      if (request.status !== 200) {

         movies.innerHTML = 'Упс... что-то пошло не так:(';
         console.log('error: ' + request.status);
         return;

      }

      const output = JSON.parse(request.responseText);

      let inner = '';

      output.results.forEach((item) => {

         let titleItem = item.title;

         inner += `<div class="col">${titleItem}</div>`;

      });

      console.log(output);

      movies.innerHTML = inner;

   });

}
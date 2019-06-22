const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');

function apiSearch(event) {

   event.preventDefault();          // Отмена перезагрузки страницы
   
   const searchText = document.querySelector('#searchText').value;
   const server = `https://api.themoviedb.org/3/search/multi?api_key=f0e69e9835744a61a209bae6c3f7caf6&language=ru&query=${searchText}`;

   movies.innerHTML = 'Загрузка';

   requestApi('GET', server)
            .then((result) => {

               const output = JSON.parse(result);

               let inner = '';
         
               output.results.forEach((item) => {
         
                  let titleItem = item.title;
         
                  inner += `<div class="col">${titleItem}</div>`;
         
               });

               movies.innerHTML = inner;

            })
            .catch((reason) => {

               movies.innerHTML = 'Упс... что-то пошло не так:(';
               console.log('error: ' + reason.status);

            });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

   return new Promise ((resolve, reject) => {

      const request = new XMLHttpRequest();

      request.open(method, url);
      request.addEventListener('load', () => {

         if (request.status !== 200) {

            reject({

               status: request.status
   
            });

            return;

         }

         resolve(request.response);

      });

      request.addEventListener('error', () => {

         reject({

            status: request.status

         });

      });

      request.send();

   });

}
const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {

   event.preventDefault();          // Отмена перезагрузки страницы
   
   const searchText = document.querySelector('#searchText').value;
   const server = `https://api.themoviedb.org/3/search/multi?api_key=f0e69e9835744a61a209bae6c3f7caf6&language=ru&query=${searchText}`;

   movies.innerHTML = '<div class="spinner"></div>';

   fetch(server)
      .then((value) => {

         if (value.status !== 200) {

            return Promise.reject(new Error('Ошибка'));

         }
         
         return value.json();

      })
      .then((output) => {
         let inner = '';
         
         output.results.forEach((item) => {
   
            let titleItem = item.title;
            const poster = item.poster_path ? urlPoster + item.poster_path : './images/poster-none.jpg';
   
            inner += `
               <div class="col-3">
                  <img src="${poster}" alt="${titleItem}" class="poster">
                  <a href="https://api.themoviedb.org/3/movie/${item.id}?api_key=f0e69e9835744a61a209bae6c3f7caf6&language=ru-RU">${titleItem}</a>
               </div>
            `;
   
         });

         movies.innerHTML = inner;
      })
      .catch((reason) => {

         movies.innerHTML = 'Упс... что-то пошло не так:(';
         console.log('error: ' + reason);

      });

}

searchForm.addEventListener('submit', apiSearch);
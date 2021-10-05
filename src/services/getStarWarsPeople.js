export const getStarWarsPeople = async (
  progress,
  url = 'https://swapi.dev/api/people',
  people = []
) => {
  return await new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw `${response.status}: ${response.statusText}`;
        }
        response
          .json()
          .then((data) => {
            people = people.concat(data.results);

            if (data.next) {
              progress && progress(people);
              getStarWarsPeople(progress, data.next, people)
                .then(resolve)
                .catch(reject);
            } else {
              resolve(people);
            }
          })
          .catch(reject);
      })
      .catch(reject)
  );
};

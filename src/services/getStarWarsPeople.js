export const getStarWarsData = async (endpoint, progress, list = []) => {
  return await new Promise((resolve, reject) =>
    fetch(endpoint)
      .then((response) => {
        if (response.status !== 200) {
          throw `${response.status}: ${response.statusText}`;
        }
        response
          .json()
          .then((data) => {
            list = list.concat(data.results);

            if (data.next) {
              progress && progress(list);
              getStarWarsData(data.next, progress, list)
                .then(resolve)
                .catch(reject);
            } else {
              resolve(list);
            }
          })
          .catch(reject);
      })
      .catch(reject)
  );
};


export async function Animes(name: string = 'anime') {
  const URL = 'https://graphql.anilist.co';

  const query = `
    query ($search: String) {
      Page(perPage: 20) {
        media(
          search: $search
          type: ANIME
          sort: POPULARITY_DESC
        ) {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
          }
        }
      }
    }
  `;

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        search: name || null,
      },
    }),
  });

  const result = await response.json();
  return result?.data?.Page?.media ?? [];
}

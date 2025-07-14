export const getUserRepos = async (repoLink, page = 1) => {
  try {
    const res = await fetch(`${repoLink}?sort=created&page=${page}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error');
    return [];
  }
};

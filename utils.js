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

export const dateFormatter = (rawDate) => {
  const date = new Date(rawDate);
  const formatedDate = date?.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatedDate;
};
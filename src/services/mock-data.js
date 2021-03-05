const mockMoviesData = {
  movies: [
    {
      id: 1,
      title: 'Pulp Fiction',
      description: 'Action & Adventure',
      year: 1994,
      posterUri: '/public/images/posters/pulp_fiction.jpg',
    },
    {
      id: 2,
      title: 'Bohemian Rhapsody',
      description: 'Drama, Biography, Music',
      year: 2018,
      posterUri: '/public/images/posters/bohemian-rhapsody.jpg',
    },
    {
      id: 3,
      title: 'Kill Bill: Vol 2',
      description: 'Oscar winning Movie',
      year: 2003,
      posterUri: '/public/images/posters/kill_bill_v2.jpg',
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      description: 'Action & Adventure',
      year: 1994,
      posterUri: '/public/images/posters/pulp_fiction.jpg',
    },
    {
      id: 5,
      title: 'Bohemian Rhapsody',
      description: 'Drama, Biography, Music',
      year: 2018,
      posterUri: '/public/images/posters/bohemian-rhapsody.jpg',
    },
    {
      id: 6,
      title: 'Kill Bill: Vol 2',
      description: 'Oscar winning Movie',
      year: 2003,
      posterUri: '/public/images/posters/kill_bill_v2.jpg',
    },
  ],
};

const GENRES = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Documentary' },
  { id: 3, label: 'Comedy' },
  { id: 4, label: 'Horror' },
  { id: 5, label: 'Crime' },
];

const SORT_BY_VALUES = [
  { id: 1, label: 'Release Date', value: 'year' },
  { id: 2, label: 'Title', value: 'title' },
];

export { mockMoviesData, GENRES, SORT_BY_VALUES };

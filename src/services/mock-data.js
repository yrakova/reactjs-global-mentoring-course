const mockMoviesData = {
  movies: [
    {
      id: '1',
      title: 'Pulp Fiction',
      description: 'Quentin Tarantino\'s film that won the Palme d\'Or at the Cannes Film Festival, Oscar and had a huge impact on cinema.',
      genres: ['thriller', 'comedy', 'crime'],
      year: 1994,
      posterUri: '/public/images/posters/pulp_fiction.jpg',
    },
    {
      id: '2',
      title: 'Bohemian Rhapsody',
      description: 'The story of the legendary band Queen and its founder. Sensational biopic that won four Oscars.',
      genres: ['drama', 'biography', 'music'],
      year: 2018,
      posterUri: '/public/images/posters/bohemian-rhapsody.jpg',
    },
    {
      id: '3',
      title: 'Kill Bill: Vol 2',
      description: 'Black Mamba is getting closer to the leader of the gang. Continuation of Quentin Tarantino\'s cinephile action.',
      genres: ['action', 'thriller', 'crime'],
      year: 2004,
      posterUri: '/public/images/posters/kill_bill_v2.jpg',
    },
    {
      id: '4',
      title: 'Moana',
      description: 'The daughter of a leader and a stubborn demigod save nature from destruction. Disney Ocean Journey with Songs and Challenges.',
      genres: ['cartoon', 'musical', 'fantasy', 'comedy', 'adventure', 'family'],
      year: 2016,
      posterUri: '/public/images/posters/moana.jpg',
    },
    {
      id: '5',
      title: 'Interstellar',
      description: 'A fantastic epic about a choking Earth, space flights and paradoxes of time. Oscar for special effects.',
      genres: ['fantasy', 'drama', 'adventure'],
      year: 2014,
      posterUri: '/public/images/posters/interstellar.jpg',
    },
    {
      id: '6',
      title: 'Pretty Woman',
      description: 'The famous rom-com about the love of a millionaire and a girl with low social responsibility.',
      year: 1990,
      genres: ['melodrama', 'comedy'],
      posterUri: '/public/images/posters/pretty_woman.jpg',
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

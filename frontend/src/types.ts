// TODO
type Continent = {
  id: number;
  name: string;
};

type Country = {
  id: number;
  name: string;
  code: string;
  emoji: string;
  continent: Continent;
};

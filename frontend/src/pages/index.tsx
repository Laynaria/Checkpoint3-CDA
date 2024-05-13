import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ALL_COUNTRIES = gql`
  query Countries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);

  const { loading, error } = useQuery(GET_ALL_COUNTRIES, {
    onCompleted: (data: any) => {
      console.log(data.countries);
      setCountries(data.countries);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <main>
      <section>
        <h1>Hello, wilder !</h1>
        {countries?.map((country) => (
          <h2 key={country.id}>{country.name}</h2>
        ))}
      </section>
    </main>
  );
}

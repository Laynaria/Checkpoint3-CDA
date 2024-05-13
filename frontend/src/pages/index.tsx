import styles from "@/styles/index.module.css";

import Card from "@/components/Card";
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
      setCountries(data.countries);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <section className={styles.section}>
      {countries?.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          name={country.name}
          emoji={country.emoji}
          code={country.code}
          continent={country.continent}
        />
      ))}
    </section>
  );
}

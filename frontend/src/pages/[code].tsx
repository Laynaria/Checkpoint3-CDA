import styles from "@/styles/countrypage.module.css";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Flag from "react-world-flags";

const GET_COUNTRY = gql`
  query Countries($code: String!) {
    country(code: $code) {
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

export default function CountryPage() {
  const router = useRouter();
  const { code } = router.query;

  const [country, setCountry] = useState<Country>({
    id: 0,
    name: "",
    code: "",
    emoji: "",
    continent: { id: 0, name: "" },
  });

  const { loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: code },
    onCompleted: (data: any) => {
      setCountry(data.country);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <article className={styles.article}>
      <Flag code={country.code} className={styles.flag} />
      <h1 className={styles.title}>
        Name: {country.name} ({country.code})
      </h1>
      <p className={styles.paragraph}>Continent : {country.continent.name}</p>
    </article>
  );
}

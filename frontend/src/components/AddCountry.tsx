import styles from "@/styles/addcountry.module.css";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ALL_CONTINENTS = gql`
  query Query {
    continents {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
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
/*
variables: 
    {
  "data": {
    "code": "",
    "continent": {
      "id": 2
    },
    "emoji": "",
    "name": ""
  }
}
*/

export default function AddCountry() {
  const [continents, setContinents] = useState<Continent[]>([]);

  const { loading, error } = useQuery(GET_ALL_CONTINENTS, {
    onCompleted: (data: any) => {
      setContinents(data.continents);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Name
        <input type="name" className={styles.input} />
      </label>

      <label className={styles.label}>
        Emoji
        <input type="name" className={styles.input} />
      </label>

      <label className={styles.label}>
        Code
        <input type="name" className={styles.input} />
      </label>

      <label className={styles.label}>
        Continent
        <select className={styles.select}>
          {continents.map((continent) => (
            <option value={continent.id} key={continent.id}>
              {continent.name}
            </option>
          ))}
        </select>
      </label>

      <button className={styles.button}>Add</button>
    </form>
  );
}

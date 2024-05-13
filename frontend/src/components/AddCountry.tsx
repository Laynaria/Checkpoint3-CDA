import styles from "@/styles/addcountry.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
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

export default function AddCountry({ countries, setCountries }: any) {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [newCountry, setNewCountry] = useState<AddCountry>({
    name: "",
    code: "",
    emoji: "",
    continent: { id: 0 },
  });

  const { loading, error } = useQuery(GET_ALL_CONTINENTS, {
    onCompleted: (data: any) => {
      setContinents(data.continents);
      setNewCountry({
        ...newCountry,
        continent: { id: data.continents[0].id },
      });
    },
  });

  const [createCountry] = useMutation(ADD_COUNTRY);

  const handleChangeContinent = (continent: Continent) => {
    setNewCountry({
      ...newCountry,
      continent: { id: continent.id },
    });
  };

  const handleChangeCountry = (e: any) => {
    const { name, value } = e.target;
    setNewCountry({ ...newCountry, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(newCountry);
    createCountry({
      variables: { data: newCountry },
    });
    setCountries([...countries, newCountry]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          name="name"
          type="name"
          className={styles.input}
          onChange={(e: any) => handleChangeCountry(e)}
        />
      </label>

      <label className={styles.label}>
        Emoji
        <input
          name="emoji"
          type="name"
          className={styles.input}
          onChange={(e: any) => handleChangeCountry(e)}
        />
      </label>

      <label className={styles.label}>
        Code
        <input
          name="code"
          type="name"
          className={styles.input}
          onChange={(e: any) => handleChangeCountry(e)}
        />
      </label>

      <label className={styles.label}>
        Continent
        <select
          className={styles.select}
          onChange={(e: any) =>
            handleChangeContinent(continents[e.target.value - 1])
          }
        >
          {continents.map((continent) => (
            <option value={continent.id} key={continent.id}>
              {continent.name}
            </option>
          ))}
        </select>
      </label>

      <button className={styles.button} onClick={(e: any) => handleSubmit(e)}>
        Add
      </button>
    </form>
  );
}

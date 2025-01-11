import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    fields: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(baseUrl);
      const result = await response.data;
      setResources(result);
    };
    getData();
  }, [baseUrl]);

  const create = (resource) => {
    console.log("resource:", resource);
    console.log("baseUrl:", baseUrl);
    const createResource = async () => {
      const response = await axios.post(baseUrl, resource);
      setResources(resources.concat(response.data));
    };
    createResource();
  };

  const service = {
    create,
  };
  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.fields.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.fields.value,
      number: number.fields.value,
    });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.fields} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.fields} /> <br />
        number <input {...number.fields} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;

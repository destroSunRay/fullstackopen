import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../ services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const createAnecdote = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueriesData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    createAnecdote.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

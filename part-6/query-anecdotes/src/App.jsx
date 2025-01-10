import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "./ services/anecdotes";
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const getAllAnecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const updateAnecdote = useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient
        .getQueryData(["anecdotes"])
        .map((anecdote) => {
          return anecdote.id === newAnecdote.id ? newAnecdote : anecdote;
        });
      queryClient.setQueriesData(["anecdotes"], anecdotes);
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `anecdote '${newAnecdote.content}' voted.`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "SET_NOTIFICATION", payload: "" });
      }, 5000);
    },
  });

  if (getAllAnecdotes.isLoading) {
    return <div>Loading data...</div>;
  }

  if (getAllAnecdotes.status === "error") {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = getAllAnecdotes.data;

  const handleVote = (anecdote) => {
    console.log("vote");
    updateAnecdote.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

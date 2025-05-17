import { useState } from "react";
import { useEmbedding } from "../hooks/useEmbedding";
import { Loading } from "../components/Loading";
import { ErrorPage } from "./ErrorPage";

export const Search = () => {
  const [text, SetText] = useState("apple");
  const { data, loading, error } = useEmbedding({ text });
  console.log({ data });

  if (loading) return <Loading></Loading>;
  if (error) return <ErrorPage error={error}></ErrorPage>;

  return (
    <>
      <p>{data}</p>
    </>
  );
};

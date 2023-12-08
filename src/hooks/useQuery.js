import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = [], configs) => {
  console.log("dependencies", dependencies);
  const { preventDefaultCall = false } = configs || {};
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    if (preventDefaultCall) return;
    fetchData();
  }, dependencies);
  const fetchData = async (query) => {
    try {
      setLoading(true);
      const response = await promise(query);
      setData(response || []);
    } catch (error) {
      console.log("error", error);
      setError(!error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;

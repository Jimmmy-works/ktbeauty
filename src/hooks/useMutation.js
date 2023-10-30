import React, { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const execute = async (...payload) => {
    try {
      const response = await promise(...payload);
      if (response) {
        setData(response);
        setLoading(true);
      }
      setLoading(true);
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
    execute,
  };
};

export default useMutation;

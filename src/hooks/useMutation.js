import { message } from "antd";
import { useEffect, useState } from "react";

const useMutation = (promise, config) => {
  const { onSuccess, onFail } = config || {};
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const execute = async (...payload) => {
    setLoading(true);
    try {
      const response = await promise(...payload);
      if (response?.status === 200) {
        setData(response || []);
        onSuccess && onSuccess(response || []);
        message.success(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      setError(!error);
      setLoading(false);
      onFail && onFail(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    execute,
    config,
  };
};

export default useMutation;

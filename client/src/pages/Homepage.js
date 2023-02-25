import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

function Homepage() {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </div>
  );
}

export default Homepage;

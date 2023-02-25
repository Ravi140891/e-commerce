import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";

function CreateCategory() {
  return (
    <>
      <Layout title="Dashboard Create Category E-Commerce Site">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Categories</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CreateCategory;

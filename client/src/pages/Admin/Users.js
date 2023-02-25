import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";

function Users() {
  return (
    <>
      <Layout title="Dashboard All Users E-Commerce Site">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Users</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Users;

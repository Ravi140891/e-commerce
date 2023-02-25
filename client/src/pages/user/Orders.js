import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";

function Orders() {
  return (
    <>
      <Layout title="Your Orders E-Commerce Site">
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h3>Your Orders</h3>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Orders;

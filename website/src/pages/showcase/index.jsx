import React from 'react';
import Layout from "@theme/Layout";
import "./showcase.css";

const ShowcaseHeader = () => {
    return (
        <div className='showcase-header'>
            <h1>Showcase Page</h1>
        </div>
    )
}

const Showcase = () => {
  return (
   <Layout  title={`Showcase`}
   description="Description will go into a meta tag in <head />" >
    <ShowcaseHeader />
   </Layout>
  )
}

export default Showcase
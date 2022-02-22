// For @ Route domain/meals

import Link from "next/link";

function about(props) {
  return (
    <div>
      <h1>Search Result</h1>
      <ul>
        {props.searchData.search}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context){
 
  return {
    props:{
      searchData: context.query
    }
  }
}

export default about;

import type { NextPage } from 'next'
import Seo from "../../../components/Seo";
import {useRouter} from "next/router";

type DataType = {
  params: [string, string] | undefined
}

// export function getServerSideProps({ params: { params } }) {
//   return {
//     props: {
//       params,
//     },
//   };
// }

const Content: NextPage<DataType> = ({ params }) => {
  const router = useRouter();
  const [title, id] = params || [];
  return (
      <>
        <Seo title={title ?? ''} />
    <h1>{title}</h1>
      </>
  )
}

export default Content

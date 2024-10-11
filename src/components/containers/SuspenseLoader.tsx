import LoadingBox from "components/presentational/LoadingBox";
import { ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}

const SuspenseLoader: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<LoadingBox />}>{children}</Suspense>;
};

export default SuspenseLoader;

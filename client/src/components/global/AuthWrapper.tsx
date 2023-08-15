import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../../redux/api/userApi";
import Loading from "./Loading";

const AuthWrapper = () => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getUser.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <Loading />;
  }
  console.log(user);
  console.log(cookies);

  return cookies && user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthWrapper;

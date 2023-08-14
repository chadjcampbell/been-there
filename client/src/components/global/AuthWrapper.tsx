import { Navigate, Outlet } from "react-router-dom";
import { userApi } from "../../redux/api/userApi";
import Loading from "./Loading";

const AuthWrapper = () => {
  const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getUser.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  console.log(user);
  if (loading) {
    return <Loading />;
  } else if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;

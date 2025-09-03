import PageWrapper from "@/components/PageWrapper";
import AddUser from "@/features/user/AddUser";
import UserCards from "@/features/user/UsersCard";
import { SkeletonTable } from "@/components/LazyLoader";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore/Index";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import Filter from "@/features/user/Filter";
import { getAllPatients } from "@/api/patient";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("@/features/patient/Table"));

export default function Patient() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const gender = searchParams.get("gender") || "";
  const bloodGroup = searchParams.get("bloodGroup") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllUsers", page, limit, query, gender, bloodGroup],
    queryFn: () => getAllPatients(searchParams, accessToken),
  });
  const {
    handlePageChange,
    totalPages,
    hasMore,
    currentPage,
    // limit: pageLimit,
  } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const patients = data?.data?.data?.patients || [];
  // console.log(data);

  // if (isPending) {
  //   return <LazyLoader />;
  // }

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Patient</h1>
          <p className="text-gray-500">Manage your patients</p>
        </div>
        {/* <div className=" hidden md:flex gap-4 justify-end"></div> */}
      </div>
      <div className="flex justify-end items-center">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? <SkeletonTable /> : <>
      {isError ? (
        <ErrorAlert error={error?.response?.data?.message} />
      ) : (
        <>
          {patients?.length > 0 ? (
            <>
              {" "}
              <Suspense fallback={<SkeletonTable />}>
                <Table patients={patients} />
              </Suspense>
              <Paginate
                totalPages={totalPages}
                hasMore={hasMore}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p className="mt-6 font-semibold text-center">No patients found</p>
          )}
        </>
      )}
      </>}
      {/* <div className="grid grid-cols-12 gap-4 ">
            
          </div> */}
    </PageWrapper>
  );
}

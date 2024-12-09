import { Select } from "@/ui/Select";
import styles from "./style.module.css";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/users";
import { Option } from "@/types/select";

type Pagination = {
  page: number;
  limit: number;
};

export const UsersSelect = () => {
  const [usersOptions, setUsersOptions] = useState<Option[]>([]);
  const [totalOptions, setTotalOptions] = useState<number | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
  });

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://frontend-test-middle.vercel.app/api/users?page=${pagination.page}&limit=${pagination.limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      const usersDataOptions = users.data.map((user: User) => ({
        id: user.id,
        title: `${user.last_name} ${user.first_name} ${user.job}`,
      }));

      setTotalOptions(users.meta.total);
      setUsersOptions((prev) => [...prev, ...usersDataOptions]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [pagination]);

  const getMoreUsers = useCallback(() => {
    setPagination((prev) => ({
      page: prev.page + 1,
      limit: prev.limit,
    }));
  }, []);

  useEffect(() => {
    getUsers();
  }, [pagination, getUsers]);

  return (
    <div className={styles.select}>
      <div className={styles["user-select"]}>
        <Select
          options={usersOptions}
          onScroll={getMoreUsers}
          totalOptions={totalOptions}
        />
      </div>
    </div>
  );
};

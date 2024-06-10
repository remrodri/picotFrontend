import * as stylex from "@stylexjs/stylex";
import { useRecords } from "../../context/record/RecordProvider";
import { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import FilterByDate from "./FilterByDate";
import FilterByName from "./FilterByName";
import { useUsers } from "../../context/user/UserProvider";
import FilterByRol from "./FilterByRol";
import { useRoles } from "../../context/role/RoleProvider";

const styles = stylex.create({
  base: () => ({
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
    height: "100%",
    background: {
      default: "rgba(35, 39, 46, 0.57)",
    },
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0,0,0,0.3)",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }),
  topContainer: () => ({
    height: "8rem",
    borderTopRightRadius: "1rem",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    background: {
      default: "rgba(35, 39, 46, 0.57)",
    },
    backdropFilter: "blur(5px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  }),
  labelTopContainer: () => ({
    height: "3rem",
    width: "100%",
    paddingLeft: "1rem",
    alignContent: "center",
    borderTopRightRadius: "1rem",
  }),
  labelTopStyle: () => ({
    fontSize: "1.3rem",
    color: "aliceblue",
    fontWeight: "300",
  }),
  filtersContainer: () => ({
    height: "4.8rem",
    //flexGrow: 1,
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem",
    gap: "2rem",
  }),
  buttonStyle: () => ({
    height: "3.7rem",
    width: "9rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    border: "none",
    fontFamily: "Poppins",
    background: {
      default: "rgb(0, 127, 255)",
      ":hover": "rgb(0, 110, 255)",
    },
    color:"aliceblue"
  }),
  bottomContainer: () => ({
    flexGrow: 1,
    border: "1px solid rgba(0, 0, 0, 0.3)",
    background: {
      default: "rgba(35, 39, 46, 0.57)",
    },
    // backdropFilter: "blur(5px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderBottomRightRadius: "1rem",
    overflowY: "auto",
  }),
});

function RecordComponent() {
  const { loadRecords, records } = useRecords();
  const { loadUsers, users } = useUsers();
  const { loadRoles, roles } = useRoles();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");
  const [roleToFilter, setRoleToFilter] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    loadRecords();
    loadUsers();
    loadRoles();
    setDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDates = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const today = `${year}-${month}-${day}`;
    setStartDate(today);
    setEndDate(today);
  };

  const handleFilterClick = () => {
    handleRecords();
  };

  const handleRecords = () => {
    const filtered = [filterByDate, filterByName, filterByRole].reduce(
      (acc, filterFunc) => filterFunc(acc),
      records
    );
    setFilteredRecords(filtered);
  };

  const filterByDate = (recordsToFilter) => {
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");
    const start = new Date(
      startYear,
      parseInt(startMonth, 10) - 1,
      startDay,
      0,
      0,
      0
    );

    const end = new Date(
      endYear,
      parseInt(endMonth, 10) - 1,
      endDay,
      23,
      59,
      59
    );

    return recordsToFilter.filter(
      (record) =>
        new Date(record.createAt) >= start && new Date(record.createAt) <= end
    );
    //console.log("newRecords::: ", newRecords);
    // setFilteredRecords(newRecords);
  };

  const filterByName = (recordsToFilter) => {
    //console.log('nameToFilter::: ', nameToFilter);
    // const userId = users.find(user=>`${user.firstName} ${user.lastName}` ===nameToFilter)._id
    // //console.log('userId::: ', userId);
    // const filteredByName = filteredRecords.filter(record=>record.userId === userId)
    // console.log('filteredByName::: ', filteredByName);
    // setFilteredRecords(filteredByName);
    if (!nameToFilter) return recordsToFilter;
    const user = users.find(
      (user) => `${user.firstName} ${user.lastName}` === nameToFilter
    );
    if (!user) return [];
    const userId = user._id;
    return recordsToFilter.filter((record) => record.userId === userId);
  };

  const filterByRole = (recordsToFilter) => {
    // console.log("filtrar por rol: ", roleToFilter);
    // console.log("recordsToFilter::: ", recordsToFilter);
    // console.log("roles::: ", roles);
    if (!roleToFilter||roleToFilter==="") return recordsToFilter;
    const findedRoleId = roles.find(
      (role) => role.roleName === roleToFilter
    )._id;
    // console.log("roleName::: ", findedRoleId);
    if (!findedRoleId) return [];
    return recordsToFilter.filter((record) => {
      const userRoleId = users.find(
        (user) => user._id === record.userId
      ).roleId;
      if (!userRoleId) return [];
      return userRoleId === findedRoleId;
    });
    // return recordsToFilter;
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.topContainer())}>
        <div {...stylex.props(styles.labelTopContainer())}>
          <label htmlFor="" {...stylex.props(styles.labelTopStyle())}>
            Aplicar filtro:
          </label>
        </div>
        <div {...stylex.props(styles.filtersContainer())}>
          <FilterByDate
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <FilterByName setNameToFilter={setNameToFilter} />
          <FilterByRol setRoleToFilter={setRoleToFilter} />
          <button
            onClick={() => handleFilterClick()}
            {...stylex.props(styles.buttonStyle())}
          >
            Aplicar
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>
        <CardsContainer
          filteredRecords={filteredRecords}
          filterByDate={filterByDate}
          // addUserToRecord={addUserToRecord}
          handleRecords={handleRecords}
          setFilteredRecords={setFilteredRecords}
          users={users}
        />
      </div>
    </div>
  );
}
export default RecordComponent;

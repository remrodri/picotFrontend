import * as stylex from "@stylexjs/stylex";
import { useUsers } from "../../context/user/UserProvider";

const styles = stylex.create({
  base: () => ({
    display: "flex",
    flexDirection: "column",
  }),
  labelStyle: () => ({
    color: "aliceblue",
    fontSize:"1.2rem"
  })
});

function FilterByName(props) {
  const { users } = useUsers();
  // eslint-disable-next-line react/prop-types
  const { setNameToFilter } = props;

  const handleSelectUser = (event) => {
    // console.log('event::: ', event);
    setNameToFilter(event);
    
  };


  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="" {...stylex.props(styles.labelStyle())}>por nombre: </label>
      <input
        placeholder="Nombre"
        list="userList"
        name="userInput"
        onChange={(e)=>handleSelectUser(e.target.value)}
        autoComplete="off"
      />
      <datalist id="userList">
        {users.map((user) => (
          <option key={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </datalist>
    </div>
  );
}
export default FilterByName;

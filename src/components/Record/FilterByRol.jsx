import * as stylex from "@stylexjs/stylex";
import { useRoles } from "../../context/role/RoleProvider";
import { PropTypes } from "prop-types";

const styles = stylex.create({
  base: () => ({
    display: "flex",
    flexDirection: "column",
  }),
  labelStyle: () => ({
    color: "aliceblue",
    fontSize:"1.2rem"
  }),
  optionStyle: () => ({
    height: "2.1rem",
    width:"15rem"
  })
});
function FilterByRol(props) {
  const { roles } = useRoles();
  const { setRoleToFilter } = props;
  const handleRoleSelect = (event) => {
    console.log("event::: ", event);
    setRoleToFilter(event);
  };

  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="" {...stylex.props(styles.labelStyle())}>
        Por rol
      </label>
      <select
        name=""
        id="select"
        defaultValue={""}
        onChange={(e) => handleRoleSelect(e.target.value)}
        {...stylex.props(styles.optionStyle())}
      >
        <option value="">Todos</option>
        {roles.map((rol) => (
          <option key={rol._id} >{rol.roleName}</option>
        ))}
      </select>
    </div>
  );
}

FilterByRol.propTypes = { setRoleToFilter: PropTypes.func.isRequired };
export default FilterByRol;

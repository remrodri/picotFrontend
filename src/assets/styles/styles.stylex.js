import * as stylex from "@stylexjs/stylex";

const formStyles = stylex.create({
  base: () => ({
    width: "40rem",
    // height: newHeight ? newHeight : "23rem",
    height: "25rem",
    borderRadius: "1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "baseline",
    // padding:"1rem 0 1rem 0"
  }),
  titleContainer: () => ({
    color: "aliceblue",
    fontSize: "1.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem",
  }),
  inputContainer: (newHeight) => ({
    display: "flex",
    flexDirection: "column",
    height: newHeight ? newHeight : "6rem",
    padding: "0 3rem 0 3rem",
    overflowY:"auto"
  }),
  labelInputStyle: () => ({
    color: "aliceblue",
    fontSize: "1.3rem",
  }),
  fieldStyle: (NewWidth, height) => ({
    width: NewWidth && NewWidth,
    height: height ? height : "2.8rem",
    borderRadius: "0.7rem",
    border: "none",
    paddingLeft: "1rem",
    fontFamily: "Poppins",
  }),
    textAreaStyle: () => ({
      
  }),
});

export default formStyles;

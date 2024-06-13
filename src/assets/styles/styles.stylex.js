import * as stylex from "@stylexjs/stylex";

const formStyles = stylex.create({
    base: (newHeight) => ({
        width: "40rem",
        height: newHeight? newHeight:"23rem",
        borderRadius: "1rem",
        background: "rgba(255,255,255,0.2)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // padding:"rem 0 1rem 0"
    }),
    titleContainer: () => ({
        color: "aliceblue",
        fontSize: "1.5rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
    }),
    inputContainer: () => ({
        display: "flex",
        flexDirection: "column",
        height: "6rem",
        padding: "0 3rem 0 3rem",
    }),
    labelInputStyle: () => ({
        color: "aliceblue",
        fontSize: "1.3rem",
    }),
    fieldStyle: (newWidth) => ({
        width: newWidth && newWidth,
        height: "2.8rem",
        borderRadius: "0.7rem",
        border: "none",
        paddingLeft: "1rem",
        fontFamily: "Poppins",
    }),
});

export default formStyles;

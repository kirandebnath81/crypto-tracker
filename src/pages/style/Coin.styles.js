import { createTheme, styled } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h3" },
          style: {
            fontFamily: "Montserrat",
            fontWeight: "bold",
            margin: "15px 0px",
          },
        },
        {
          props: { variant: "h5" },
          style: {
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "1.45rem",
          },
        },

        {
          props: { variant: "body" },
          style: {
            fontFamily: "Montserrat",
            fontSize: "1.3rem",
            fontWeight: 500,
            marginLeft: "10px",
            display: "block",
          },
        },
      ],
    },
  },
});

export const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  marginLeft: 20,
  paddingRight: "15px",
  borderRight: "1.5px solid darkgrey",
  fontFamily: "Montserrat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.05rem",
  wordSpacing: "3px",
  lineHeight: "1.4rem",
  letterSpacing: "1px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    padding: "0px 20px",
  },
}));

export const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "13px 0px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export const Main = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "30px 0px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const getTableStyles = (theme) => {
  return {
    table: {
      style: {
        borderRadius: "10px",
        overflow: "hidden",
      },
    },
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: theme.color2 ?? "#CCCCCC",
      },
    },
    headCells: {
      style: {
        color: "rgb(10 14 26 / 76%)",
        "&:hover": {
          color: "#ffffff",
        },
        border: "solid 1px",
        padding: "10px",
      },
      activeSortStyle: {
        color: theme.color4 ?? "#555555",
        "&:hover, &:hover:not(:focus)": {
          color: theme.color4 ?? "#555555",
        },
      },
      inactiveSortStyle: {
        "&:hover": {
          color: theme.color4 ?? "#555555",
        },
      },
    },
    rows: {
      style: {
        borderBottom: "none",
        "&:not(:last-of-type)": {
          borderBottom: "none",
        },
      },
      stripedStyle: {
        backgroundColor: theme.color4
          ? `${theme.color4}1a`
          : "rgba(85,85,85,0.1)",
      },
    },
    cells: {
      style: {
        padding: "10px",
        color: "rgb(10 14 26 / 76%)",
        border: "1px solid",
      },
    },
    pagination: {
      style: {
        paddingTop: "20px",
        backgroundColor: "transparent",
        border: "none",
        borderColor: theme.color4 ? `${theme.color4}80` : `rgba(85,85,85,0.5)`,
      },
      pageButtonsStyle: {
        backgroundColor: "#ffffff",
        marginLeft: "6px",
        borderRadius: "10px",
        border: "1px solid rgba(85,85,85,0.5)",
        borderColor: theme.color4 ? `${theme.color4}80` : `rgba(85,85,85,0.5)`,
        color: theme.color4,
        fill: theme.color4,
      },
    },
  };
};

export default getTableStyles;

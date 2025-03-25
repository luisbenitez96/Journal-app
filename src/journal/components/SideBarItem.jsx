import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const onClickLstItem = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]); // si el titulo cambia se vuelve a ejecutar la funcion, se mira el largo del titulo si es mayor de 17 caracteres se corta y se le agrega ... el title.substring sirve para cortar el titulo en este caso del caracter 0 al 17 y se le agrega ... al final

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickLstItem}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { EditActivityForm } from "./editActivityForm";

const useStyles = makeStyles({
  message: {
    marginBottom: "1rem",
  },
});

export const EditActivityDialog = ({ open, onClose, activity }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(400));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Редактировать дело</DialogTitle>
      <DialogContent>
        <Typography
          color="textSecondary"
          variant="caption"
          display="block"
          className={classes.message}
        >
          Введите или измените информацию о деле
        </Typography>
        <EditActivityForm value={activity} />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

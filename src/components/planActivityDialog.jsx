import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";

export const PlanActivityDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

import React from "react";
import { Chip } from "@mui/material";

type Props = {
  status: string;
};

const mapColor = (s: string) => {
  switch (s) {
    case "Pending":
      return "default";
    case "Shipped":
      return "info";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function OrderStatusBadge({ status }: Props) {
  return <Chip label={status} color={mapColor(status)} />;
}

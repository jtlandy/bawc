import React from "react";
import styles from "./spinner.module.css";
import { Container } from "react-bootstrap";
export default function LoadingSpinner() {
  return (
      <div className={styles.spinner_container}>
        <div className={styles.loading_spinner}></div>
      </div>
  );
}
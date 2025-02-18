import Table from "react-bootstrap/Table";
import styles from "../styles/table.module.css";
import { CircularProgress } from "./CircularProgress";
import { useState } from "react";

export const TableLayout = ({ brokers, load }) => {
  const [currentPage, setCurrentPage] = useState(0);
  let total = brokers.length;
  let totalPage = Math.ceil(total / 10);

  return (
    <div className={styles.tableContainer}>
      {load ? (
        <div className={styles.center}>
          <CircularProgress />
        </div>
      ) : (
        <Table striped bordered hover className={styles.table}>
          <thead >
            <tr>
              <th>BROKER NAME</th>
              <th>EMAIL</th>
              <th>PHONE NO</th>
              <th>COMPANY NAME</th>
            </tr>
          </thead>

          <tbody>
            {brokers.length > 0 ? (
              brokers
                ?.slice(currentPage * 10, currentPage * 10 + 10)
                .map((data, index) => (
                  <tr key={index}>
                    <td>
                      {data.first_name} {data.last_name}
                    </td>
                    <td>{data.email}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.company_name}</td>
                  </tr>
                ))
            ) : (
              <p>No Data Available.</p>
            )}
          </tbody>
        </Table>
      )}

      <div className={styles.pagination}>
        {Array(totalPage)
          .fill()
          .map((data, index) => (
            <button
             
              onClick={(e) => setCurrentPage(index)}
              className={index===currentPage? styles.clickedPaginationButton:styles.paginationButton}
            >
              {index + 1} 
            </button>
          ))}
      </div>
    </div>
  );
};

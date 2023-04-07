import styles from "./Pagination.module.css";

function Pagination({ page, setPage, numberOfPages }) {
  return (
    <div className={styles.pagination_container}>
      <button
        style={page > 1 ? { visibility: "visible" } : { visibility: "hidden" }}
        onClick={() => setPage(page - 1)}
      >
        {"<<  "}page {page - 1}
      </button>
      <p>{page}</p>
      <button
        style={
          page < numberOfPages
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
        onClick={() => setPage(page + 1)}
      >
        page {page + 1}
        {"  >>"}
      </button>
    </div>
  );
}

export default Pagination;
